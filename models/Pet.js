const mongoose = require('mongoose');
//customize this to be for the pet project
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide A Name'],
        trim: true,
        maxLength: [25, "Name Can't Be More Than 25 Characters"]
    },
    completed:{
        type:Boolean,
        default:false,
    },
    //get rid of once al working
},{collection:"pets"})
module.exports = mongoose.model('Pet', TaskSchema);