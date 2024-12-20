const Pet = require('../models/Pet');
const asyncWrapper = require('../middleware/async');
const User = require("../models/login");
const bcrypt = require('bcrypt');

// Authentication middleware to check if a user is logged in
// const requireAuth = (req, res, next) => {
//     if (!req.cookies.loggedIn) {
//         return res.redirect('/login');
//     }
//     next();
// };

// Logout handler - clears the logged-in cookie and redirects to the login page
const getLogout = asyncWrapper(async (req, res) => {
    res.clearCookie('loggedIn');
    res.clearCookie('username');
    res.status(200).redirect('/'); 
});

// Render the login page or redirect to the homepage if already logged in
const getLogin = asyncWrapper(async (req, res) => {
    try {
        res.status(200).render('login');
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Handle username lookup and password verification during login
const getUsername = asyncWrapper(async (req, res) => {
    try {
        const check = await User.findOne({ username: req.body.username });
        if (!check) {
            return res.send("<script>alert('Username Not Found'); window.location.href = '/login'; </script>").status(404);
        }
        const passMatch = await bcrypt.compare(req.body.password, check.password);
        if (passMatch) {
            res.cookie("loggedIn", true, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });
            res.cookie("username", req.body.username, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });
            res.redirect("/");
        } else {
            return res.send("<script>alert('Incorrect Password'); window.location.href = '/login'; </script>").status(404);
        }
    } catch {
        return res.send("<script>alert('Error Caught'); window.location.href = '/login'; </script>").status(404);
    }
});

// Register a new user after checking for duplicates and hashing the password
const createUser = asyncWrapper(async (req, res) => {
    var { username, password } = req.body;
    var duplicate = await User.findOne({ username });
    if (duplicate) {
        return res.send("<script>alert('Username Unavailable'); window.location.href = '/login'; </script>").status(404);
    }
    try {
        var hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPass, isAdmin: false });
        await user.save();
        return res.send("<script>alert('User Created Successfully'); window.location.href = '/login'; </script>").status(200);
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Render the about page for authenticated users
const getAbout = asyncWrapper(async (req, res) => {
    try {
        let user = null;
        username = req.cookies.username
        if (username) {
            user = await User.findOne({ username }).catch(err => console.error(err));
        }
        res.status(200).render('about', { user });
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Render the FAQ page for authenticated users
const getFAQS = asyncWrapper(async (req, res) => {
    try {
        username = req.cookies.username
        const user = await User.findOne({ username })
        res.status(200).render('FAQ', { user });
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Render the testimonials page for authenticated users
const getTestimonials = asyncWrapper(async (req, res) => {
    try {
        username = req.cookies.username
        const user = await User.findOne({ username })
        res.status(200).render('testimonials', { user });
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Render the success page for authenticated users
const getSuccess = asyncWrapper(async (req, res) => {
    try {
        res.status(200).render('success');
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Render the admin dashboard for pets, displaying all pet records
const getAdminDashboardPets = asyncWrapper(async (req, res) => {
    try {
        username = req.cookies.username
        const user = await User.findOne({ username })
        const { isAdmin } = user
        if (isAdmin == true) {
            const allPets = await Pet.find({});
            res.status(200).render('adminPets', { allPets });
        } else {
            res.status(200).render('404', 'access denied');
        }
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Render the admin dashboard for users, displaying all user records
const getAdminDashboardUsers = asyncWrapper(async (req, res) => {
    try {
        username = req.cookies.username
        const user = await User.findOne({ username })
        const { isAdmin } = user
        if (isAdmin == true) {
            const users = await User.find({});
            res.status(200).render('adminUsers', { users });
        } else {
            res.status(200).render('404', 'access denied');
        }
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Display all pets with optional filtering based on query parameters
const getAllPets = asyncWrapper(async (req, res) => {
    try {
        let pets = await Pet.find({});
        const { state, city, breed, ageRange } = req.query;
        
        if (state || city || breed || ageRange) {
            pets = pets.filter(pet => {
                if (state && pet.state !== state) return false;
                if (city && pet.city !== city) return false;
                if (breed && pet.breed !== breed) return false;
                if (ageRange) {
                    const [min, max] = ageRange.split('-');
                    const petAge = parseInt(pet.age);
                    if (max === '+') {
                        if (petAge < parseInt(min)) return false;
                    } else {
                        if (petAge < parseInt(min) || petAge > parseInt(max)) return false;
                    }
                }
                return true;
            });
        }
        username = req.cookies.username
        const user = await User.findOne({ username })
        
        res.render('index', {
            allPets: pets,
            query: req.query,
            user
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

// Render a single pet profile based on the pet ID
const getPet = asyncWrapper(async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).render('petProfile', { pet });
    } catch (error) {
        res.status(400).render('404', { error });
    }
});

// Fetch all users and return them as JSON (for authenticated users)
const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ users });
});

module.exports = {
    getAbout,
    getAllUsers,
    getUsername,
    createUser,
    getFAQS,
    getTestimonials,
    getLogin,
    getSuccess,
    getAdminDashboardPets,
    getAdminDashboardUsers,
    getAllPets,
    getPet,
    getLogout,
};
