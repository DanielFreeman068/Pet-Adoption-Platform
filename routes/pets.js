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
    getSuccess,
    getLogin,
    getTestimonials,
    getFAQS,
    getAbout,
    getAdminDashboardPets,
    getAdminDashboardUsers,
    deletePetOrUser,
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
router.route('/:id').post(deletePetOrUser).get(getPet);

// router.route('/:id')
// .get(getPet)
// .post((req, res, next) => {
//     if (req.body.action === 'deletePet') {
//     return deletePet(req, res, next);
//     } else if (req.body.action === 'deleteUser') {
//     return deleteUser(req, res, next);
//     } else {
//     res.status(400).send('Invalid action');
//     }
// });


module.exports = router;