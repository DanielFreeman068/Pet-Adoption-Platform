const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Atleast 3 charachters."],
        maxlength: [20, "No more than 20 charachters."]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Atleast 6 charachters."],
        maxlength: [16, "No more than 16 charachters."]
    }
})

module.exports = mongoose.model('login', loginSchema)