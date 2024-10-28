const express = require('express');
const app = express();
const pets = require('./routes/pets');
const connectDB = require('./db/connect');
const port = process.env.PORT || 5500;

//Local middleware
const errorHandlerMiddleware = require('./middleware/error-handler');

//libraires
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/pets', pets);
app.use(errorHandlerMiddleware);

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