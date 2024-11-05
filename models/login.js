const mongoose = require('mongoose') // pull mongoose for schema creation 

const loginSchema = new mongoose.Schema({ // create login schema
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Atleast 3 charachters."],
        maxlength: [20, "No more than 20 charachters."],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Atleast 6 charachters."],
        maxlength: [12, "No more than 12 charachters."],
    }
},{collection:'users'})

module.exports = mongoose.model('User', loginSchema) // export login schema