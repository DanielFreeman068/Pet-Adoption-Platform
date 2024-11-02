const express = require('express');
const app = express();

// const path = require('path');
const bodyParser = require('body-parser')
const pets = require('./routes/pets');
const connectDB = require('./db/connect');
const port = process.env.PORT || 5500;
const Pet = require('./models/Pet');

//Local middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
// const { getAllPets, createPet } = require('./controller/pets');
const { deletePet } = require('./controller/pets')

//libraires
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

//routes
// app.use('/pets', pets);
app.use(errorHandlerMiddleware);

app.get('/', async (req, res) => {
    try {
        const allPets = await Pet.find({});  
        res.render('index', { allPets });
    } catch (error) {
        console.error("Error fetching pets", error);
        res.render('index', { allPets: [] });
    }
});

app.post('/pets', async (req,res) => {
    // createPet();
    Pet.create(req.body)
    const allPets = await Pet.find({});  
    res.render('index', { allPets })
})

app.get('/admin', async (req,res) => {
    try {
        const allPets = await Pet.find({});  
        res.render('admin', { allPets });
    } catch (error) {
        console.error("Error fetching pets", error);
        res.render('admin', { allPets: [] });
    }
});

app.post('/pets/:id/delete', async(req,res) => {
    const {id:petID} = req.params
    await Pet.findOneAndDelete({_id:petID})
    const allPets = await Pet.find({})
    res.redirect('/admin')
})

//initiate server
const serverInit = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
serverInit();