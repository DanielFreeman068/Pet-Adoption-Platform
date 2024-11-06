const express = require('express'); // import libaries
const app = express();
const path = require('path');
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser');


const connectDB = require('./db/connect'); // call database connection
const port = process.env.PORT || 5500; // set port

const pets = require('./routes/pets'); 
const Pet = require('./models/Pet');
// const loginRoutes = require('./routes/login'); //

//set up ejs for rendering views, use bodyparser
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser("password"))
app.use('/', pets)

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