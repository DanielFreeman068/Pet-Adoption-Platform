const asyncWrapper = require('../middleware/async'); // call asyncWrapper middleware, schema/model, createCustomError middleware, and bcrypt
const schema = require("../models/login")
const {createCustomError} = require("../errors/custom-error")
const bcrypt = require('bcrypt');

const getAllUsers = asyncWrapper(async (req, res) => { // get all users from the database for admin dashboard
    const users = await schema.find({}); // use empty params to pull all users
    res.status(200).json({users});
})

const getUsername = asyncWrapper(async (req, res) => { // get username func
    const {id: userID} = req.params;
    const username = await schema.findOne({_id: userID}); // use mongo findOne to get user by id
    if(!username){ // if user not found, return 404 error with custom error message
        return next(createCustomError('No account with username: ' + userID, 404))
    }
    res.status(200).json({username});
})

// const getPassword = asyncWrapper(async (req, res) => {
//     const {id: userID} = req.params; 
//     const password = await schema.findOne({_id: userID});
//     if(!password){
//         return next(createCustomError('Incorrect Password.', 404))
//     }
//     res.status(200).json({password});
// })

const createUser = asyncWrapper(async (req, res) => { // create user func
    var {username, password} = req.body; // set user and pass vars from request body 
    var duplicate = await schema.findOne({username});
    if(duplicate){ // if username already exists, return 400 error with custom error message
        return next(createCustomError('Username already exists.', 400))
    }
    var hashedPass = await bcrypt.hash(password, 10); // hash password using bcrypt

    const user = new schema({username, password: hashedPass}); // create new user with hashed password

    await user.save(); // save user to database

    res.status(201).json({message: 'User created successfully'});
})

const deleteUser = asyncWrapper(async (req, res) => { // delete user func
    const {id: userID} = req.params;
    const user = await schema.findOneAndDelete({_id: userID}); // find by id and delete user
    if(!user){
        return next(createCustomError('No account with username: ' + userID, 404)) // return custom error message if user not found
    }
    res.status(200).json({message: 'User deleted successfully'});
})

module.exports = {
    getAllUsers,
    getUsername,
    // getPassword,
    createUser,
    deleteUser
} // export all functions

