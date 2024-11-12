// connects your .env file to your mongodb
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(process.env.MONGOURI,{}).then(()=> {console.log("CONNECTION TO DATABASE SUCCESSFUL")})
}

module.exports = connectDB;