const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUsername,
    createUser,
    deleteUser,
    createPet,
    getPet,
    deletePet,
    getAllPets,
    getAdminDashboard,
    success,
    getLogin,
    getTestimonials,
    getFAQS,
} = require('../controller/pets');

router.route('/login').get(getLogin).post(getUsername);
router.route("/signup").post(createUser);
router.route('/FAQ').get(getFAQS);
router.route('/testimonials').get(getTestimonials);
router.route('/').get(getAllPets).post(createPet);
router.route('/success').get(success);
router.route('/admin').get(getAdminDashboard);
router.route('/:id').post(deletePet).get(getPet);

module.exports = router;