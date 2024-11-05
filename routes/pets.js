const express = require('express');
const router = express.Router();
const {
    createPet,
    getPet,
    deletePet,
    getAllPets,
    getAdminDashboard,
    success,
} = require('../controller/pets');

router.route('/').get(getAllPets).post(createPet);
router.route('/success').get(success);
router.route('/admin').get(getAdminDashboard);
router.route('/:id').post(deletePet).get(getPet);

module.exports = router;