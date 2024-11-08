//all of my variables and middleware
const Pet = require('../models/Pet');
const asyncWrapper = require('../middleware/async');
const User = require("../models/login")
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser")
const loggedIn = false
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

//configure cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
        params: {
            folder: 'full-cloud-tasks',
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
            public_id: (req,file) => file.originalname
        },
})
const upload = multer({ storage })

//gets about page rendered
const getAbout = asyncWrapper(async (req, res) => {
    try {
        // Render the about page successfully
        res.status(200).render('about');
    } catch (error) {
        // In case of an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets faqs page rendered
const getFAQS = asyncWrapper(async (req, res) => {
    try {
        // Render the faqs page successfully
        res.status(200).render('FAQS');
    } catch (error) {
        // In case of an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets testimonials page rendered
const getTestimonials = asyncWrapper(async (req, res) => {
    try {
        // Render the testimonials page successfully
        res.status(200).render('testimonials');
    } catch (error) {
        // In case of an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets success page rendered
const getSuccess = asyncWrapper(async (req, res) => {
    try {
        // Render the success page successfully
        res.status(200).render('success');
    } catch (error) {
        // In case of an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets login page rendered
const getLogin = asyncWrapper(async (req, res) => {
    try {
        // Render the login page successfully
        res.status(200).render('login');
    } catch (error) {
        // In case of an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets the pets to render on the admin page
const getAdminDashboardPets = asyncWrapper(async (req, res) => {
    try {
        // Fetch all pets and users from the database for the admin dashboard
        const allPets = await Pet.find({});
        res.status(200).render('adminPets', { allPets });
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets the users to render on the admin page
const getAdminDashboardUsers = asyncWrapper(async (req, res) => {
    try {
        // Fetch all pets and users from the database for the admin dashboard
        const users = await User.find({});
        res.status(200).render('adminUsers', { users });
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
//gets all pets to render
const getAllPets = asyncWrapper(async (req, res) => {
    try {
        // Fetch all pets from the database and renders the index page
        const allPets = await Pet.find({});
        res.status(200).render('index', { allPets });
    } catch (error) {
        // If there's an error, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});
// //creates pet
// const createPet = asyncWrapper(async (req, res) => {
//     try {
//         //creates pet and renders updated page
//         const newPet = await Pet.create(req.body);
//         res.status(201).render('success', { newPet });
//     } catch (error) {
//         // If there's a validation error or any other issue, return a 400 Bad Request status
//         res.status(400).render('404', { error });
//     }
// });
//gets specific pet to render on separate profile
const getPet = asyncWrapper(async (req, res) => {
    try {
        //looks for pet based on id and either errors or renders the pet
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found"});
        }
        res.status(200).render('petProfile', { pet });
    } catch (error) {
        // If there's an error with the request, return a 500 Internal Server Error status
        res.status(500).render('404', { error });
    }
});

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
            // const allPets = await Pet.find({});  
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
module.exports = {
    getAbout,
    getAllUsers,
    getUsername,
    // getPassword,
    createUser,
    getFAQS,
    getTestimonials,
    getLogin,
    getSuccess,
    getAdminDashboardPets,
    getAdminDashboardUsers,
    getAllPets,
    getPet,
};
