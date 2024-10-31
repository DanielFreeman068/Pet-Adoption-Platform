const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const pets = require('./routes/pets');
const connectDB = require('./db/connect');
const port = process.env.PORT || 5500;

//Local middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const { getAllPets } = require('./controller/pets');

//libraires
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/pets', pets);
app.use(errorHandlerMiddleware);

app.get('/', (req,res) => {
    const pets = getAllPets();
    res.render('index', { pets } );
});

app.get('/admin', (req,res) => {
    const pets = getAllPets();
    res.render('admin', { pets } );
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