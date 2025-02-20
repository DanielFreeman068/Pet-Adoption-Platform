// import libaries
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2
const connectDB = require('./db/connect');
const port = process.env.PORT || 5500;
const pets = require('./routes/pets'); 

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//set up ejs for rendering views, use bodyparser
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
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