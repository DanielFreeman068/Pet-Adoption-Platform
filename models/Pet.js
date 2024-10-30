const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    breed: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
},{collection:"pets"})

module.exports = mongoose.model('Pet', PetSchema);