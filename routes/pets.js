const express = require('express');
const router = express.Router();
const {
    getAllPets,
    createPet,
    getPet,
    deletePet,
} = require('../controller/pets');

router.route('/').get(getAllPets).post(createPet);
router.route('/:id').get(getPet).delete(deletePet);

module.exports = router;