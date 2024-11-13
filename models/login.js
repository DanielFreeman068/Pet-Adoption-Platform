//login and signup for users schema
const mongoose = require('mongoose') // pull mongoose for schema creation 

const loginSchema = new mongoose.Schema({ // create login schema
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Atleast 3 charachters."],
        maxlength: [20, "No more than 20 characters."],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Atleast 6 charachters."],
        maxlength: [100, "No more than 100 characters."],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},{collection:'users', versionKey: false})

module.exports = mongoose.model('User', loginSchema) // export login schema