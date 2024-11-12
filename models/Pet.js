//schema for submitting pets
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
        required: [true, 'You must provide a breed'],
        trim: true,
        minlength: [2, 'Breed must be at least 2 characters']
    },
    gender: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: [true, 'You must provide a state']
    },
    city: {
        type: String,
        required: [true, 'You must provide a city']
    },
    age: {
        type: Number,
        required: [true, 'You must provide an age'],
        min: [0, 'Age cannot be less than 0'],
        max: [30, 'Age cannot be more than 30 years']
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    behavior: {
        type: String,
        required: [true, 'You must provide a behavior description'],
        trim: true
    },
    history: {
        type: String,
        trim: true
    },
    imageURL: {
        type: String,
        default: '',
        required: [true, 'You must provide a profile picture']
    },
},{collection:"pets"})

module.exports = mongoose.model('Pet', PetSchema);