const express = require('express');
const app = express();
// const path = require('path');
const bodyParser = require('body-parser')
const pets = require('./routes/pets');
const connectDB = require('./db/connect');
const port = process.env.PORT || 5500;

//Local middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const { getAllPets, createPet } = require('./controller/pets');

//libraires
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/pets', pets);
app.use(errorHandlerMiddleware);

app.get('/', (req,res) => {
    const allPets = getAllPets();
    console.log(allPets)
    let arr2 = Object.keys(allPets).map(key => ({key, ...obj[key]}))
    console.log(typeof arr2)
    console.log(arr2)
    res.render('index', { allPets },{async: true} );
});

app.post('/pets', (req,res) => {
    createPet();
    res.redirect('/');
})

app.get('/admin', (req,res) => {
    const allPets = getAllPets();
    const petsArray = Object.values(allPets);
    res.render('admin', { petsArray } );
});

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