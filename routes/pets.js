const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet')
const User = require('../models/login')
const {
    getAllUsers,
    getUsername,
    // getPassword,
    createUser,
    createPet,
    getPet,
    getAllPets,
    getSuccess,
    getLogin,
    getTestimonials,
    getFAQS,
    getAbout,
    getAdminDashboardPets,
    getAdminDashboardUsers,
} = require('../controller/pets');
//routes to render pages
router.route('/login').get(getLogin);
router.route('/about').get(getAbout);
router.route('/FAQ').get(getFAQS);
router.route('/testimonials').get(getTestimonials);
router.route('/success').get(getSuccess);
//routes to render and deal with posts
router.route('/').get(getAllPets).post(createPet);
router.route('/adminPets').get(getAdminDashboardPets);
router.route('/adminUsers').get(getAdminDashboardUsers)
router.route('/:id').get(getPet);
//deletes pet and re renders admin pets
router.post('/pets/delete/:id', async (req, res) => {
    const petId = req.params.id;
    try {
        // Attempt to delete the pet by ID
        await Pet.findByIdAndDelete(petId);
        // Redirect to the desired page after deletion, such as the main pets listing page
        res.status(200).redirect('/adminPets');
    } catch (error) {
        // Handle error and respond with a 404 redirect
        res.status(500).render('404', { error });
    }
});
//deletes user and re renders admin users
router.post('/users/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        // Attempt to delete the user by ID
        await User.findByIdAndDelete(userId);
        // Redirect to the desired page after deletion, such as the main pets listing page
        res.status(200).redirect('/adminUsers');
    } catch (error) {
        // Handle error and respond with a 404 redirect
        res.status(500).render('404', { error });
    }
});

module.exports = router;