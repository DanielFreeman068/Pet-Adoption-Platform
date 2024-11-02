const express = require('express');
const router = express.Router();
const {
    // createPet,
    getPet,
    deletePet,
} = require('../controller/pets');

router.route('/');
router.route('/:id').get(getPet).delete(deletePet);

module.exports = router;