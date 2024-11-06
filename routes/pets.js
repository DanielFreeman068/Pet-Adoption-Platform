const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUsername,
    // getPassword,
    createUser,
    deleteUser,
    createPet,
    getPet,
    deletePet,
    getAllPets,
    getAdminDashboard,
    getSuccess,
    getLogin,
    getTestimonials,
    getFAQS,
    getAbout,
} = require('../controller/pets');
//routes to render pages
router.route('/login').get(getLogin);
router.route('/about').get(getAbout);
router.route('/FAQ').get(getFAQS);
router.route('/testimonials').get(getTestimonials);
router.route('/success').get(getSuccess);
//routes to render and deal with posts
router.route('/').get(getAllPets).post(createPet);
router.route('/admin').get(getAdminDashboard);
router.route('/:id').post(deletePet).get(getPet);


module.exports = router;