const Pet = require('../models/Pet');
const asyncWrapper = require('../middleware/async');
const User = require("../models/login")
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser")
const loggedIn = false

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
    if(req.cookies.loggedIn){
        res.redirect("/")
    }else{
        res.render('login')
    }
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
    const loggedIn = req.cookies.loggedIn || false;
    try {
        const allPets = await Pet.find({});  
        res.render('index', { allPets, loggedIn });
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
        const pet = await Pet.findById(req.params.id);
        console.log("Pet ID:", req.params.id);
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

const getUsername = asyncWrapper(async (req, res) => { // get username funcr
    try{
        const check = await User.findOne({username: req.body.username});
        if(!check){
            return res.send("<script>alert('Username Not Found'); window.location.href = '/login'; </script>").status(404) // return custom error message if user not found
        }
        const passMatch = await bcrypt.compare(req.body.password, check.password);
        if(passMatch){
            const allPets = await Pet.find({});  
            res.cookie("loggedIn", true, {maxAge: 7 * 24 * 60 * 60 * 1000})
            res.cookie("username", "req.body.username", {maxAge: 7 * 24 * 60 * 60 *1000});
            res.redirect('/');
        }else{
            return res.send("<script>alert('Incorrect Password'); window.location.href = '/login'; </script>").status(404) // return custom error message if password is incorrect
        }

    }catch{
        return res.send("<script>alert('Incorrect credentials'); window.location.href = '/login'; </script>").status(404) // return alert error message if wrong details
    }
})

const createUser = asyncWrapper(async (req, res) => { // create user func
    var {username, password} = req.body; // set user and pass vars from request body 
    var duplicate = await User.findOne({username});
    if(duplicate){ // if username already exists, return 400 error with custom error message
        return res.send("<script>alert('Username Unavailable'); window.location.href = '/login'; </script>").status(404)
    }
    var hashedPass = await bcrypt.hash(password, 10); // hash password using bcrypt

    const user = new User({username, password: hashedPass}); // create new user with hashed password

    await user.save(); // save user to database

    return res.send("<script>alert('User Created Successfully'); window.location.href = '/login'; </script>").status(200)
})

const deleteUser = asyncWrapper(async (req, res) => { // delete user func
    const {id: userID} = req.params;
    const user = await User.findOneAndDelete({_id: userID}); // find by id and delete user
    if(!user){
        return res.send("<script>alert('User Not Found'); window.location.href = '/login'; </script>").status(404) // return custom error message if user not found
    }
    res.send("<script>alert('User Deleted'); window.location.href = '/admin'; </script>").status(200)
})

module.exports = {
    getAllUsers,
    getUsername,
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