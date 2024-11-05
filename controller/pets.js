const Pet = require('../models/Pet');
const asyncWrapper = require('../middleware/async');
const User = require("../models/login")
const bcrypt = require('bcrypt');

const getFAQS = asyncWrapper(async(req,res) => {
    res.render('FAQ')
})

const getTestimonials = asyncWrapper(async(req,res) => {
    res.render('testimonials')
})

const success = asyncWrapper(async (req,res) => {
    res.render('success')
})

const getLogin = asyncWrapper(async (req,res) => {
    res.render('login')
})

const getAdminDashboard = asyncWrapper(async (req, res) => {
    try {
        const allPets = await Pet.find({});
        res.render('admin', { allPets });
    } catch (error) {
        console.error('Error fetching pets', error);
        res.render('admin', {allPets: []});
    }
})

const getAllPets = asyncWrapper(async (req, res) => {
    try {
        const allPets = await Pet.find({});  
        res.render('index', { allPets });
    } catch (error) {
        console.error("Error fetching pets", error);
        res.render('index', { allPets: [] });
    }
});

const createPet = asyncWrapper(async (req, res) => {
    Pet.create(req.body)
    res.render('success')
});

const getPet = asyncWrapper(async (req,res) => {
    try {
        console.log("Pet ID:", req.params.id);
        const pet = await Pet.findById(req.params.id);
        console.log(pet)
        res.render('petProfile', { pet });
    } catch (error) {
        res.render('404', { error });
    }
})

const deletePet = asyncWrapper( async (req,res) => {
    console.log("Pet ID:", req.params.id);
    await Pet.findByIdAndDelete(req.params.id);
    const allPets = await Pet.find({})
    res.render('admin', { allPets })
})


//USERS

const getAllUsers = asyncWrapper(async (req, res) => { // get all users from the database for admin dashboard
    const users = await User.find({}); // use empty params to pull all users
    res.status(200).json({users});
})

const getUsername = asyncWrapper(async (req, res) => { // get username func
    const {id: userID} = req.params;
    const username = await User.findOne({_id: userID}); // use mongo findOne to get user by id
    if(!username){ // if user not found, return 404 error with custom error message
        return next(createCustomError('No account with username: ' + userID, 404))
    }
    res.status(200).json({username});
})

// const getPassword = asyncWrapper(async (req, res) => {
//     const {id: userID} = req.params; 
//     const password = await User.findOne({_id: userID});
//     if(!password){
//         return next(createCustomError('Incorrect Password.', 404))
//     }
//     res.status(200).json({password});
// })

const createUser = asyncWrapper(async (req, res) => { // create user func
    var {username, password} = req.body; // set user and pass vars from request body 
    var duplicate = await User.findOne({username});
    if(duplicate){ // if username already exists, return 400 error with custom error message
        return next(createCustomError('Username already exists.', 400))
    }
    var hashedPass = await bcrypt.hash(password, 10); // hash password using bcrypt

    const user = new User({username, password: hashedPass}); // create new user with hashed password

    await user.save(); // save user to database

    res.status(201).json({message: 'User created successfully'});
})

const deleteUser = asyncWrapper(async (req, res) => { // delete user func
    const {id: userID} = req.params;
    const user = await User.findOneAndDelete({_id: userID}); // find by id and delete user
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
    deleteUser,
    getFAQS,
    getTestimonials,
    getLogin,
    success,
    getAdminDashboard,
    getAllPets,
    createPet,
    getPet,
    deletePet,
};