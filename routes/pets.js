const express = require('express');
const router = express.Router();
const {
    getAllPets,
    createPet,
    getPet,
    updatePet,
    deletePet,
} = require('../controller/pets');

router.route('/').get(getAllPets).post(createPet);
router.route('/:id').get(getPet).patch(updatePet).delete(deletePet);
router.route('/api/v1/pets/:id').patch(updatePet);

module.exports = router;