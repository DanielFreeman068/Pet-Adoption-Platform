const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    animal: {
        type: String,
        required: true,
    },
    // gender: {
    //     type: String,
    //     required: true,
    // },
},{collection:"pets"})
module.exports = mongoose.model('Pet', TaskSchema);