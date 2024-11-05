const Pet = require('../models/Pet');
const asyncWrapper = require('../middleware/async');


const success = asyncWrapper(async (req,res) => {
    res.render('success')
})

const getAdminDashboard = asyncWrapper(async (req, res) => {
    try {
        const allPets = await Pet.find({});
        res.render('admin', { allPets });
    } catch (error) {
        console.error('Error fetching pets', error);
        res.render('admin', {allPets: []});
    }
})

const getAllPets = asyncWrapper(async (req, res) => {
    try {
        const allPets = await Pet.find({});  
        res.render('index', { allPets });
    } catch (error) {
        console.error("Error fetching pets", error);
        res.render('index', { allPets: [] });
    }
});

const createPet = asyncWrapper(async (req, res) => {
    Pet.create(req.body)
    res.render('success')
});

const getPet = asyncWrapper(async (req,res) => {
    const {id:petID } = req.params;
    const pet = await Pet.findOne({_id:petID});
    if (!pet) {
        return res.status(404).send('Pet not found');
    }
    res.render('petProfile', { pet });
})

const deletePet = asyncWrapper( async (req,res) => {
    const {id:petID} = req.params
    await Pet.findOneAndDelete({_id:petID})
    const allPets = await Pet.find({})
    res.render('admin', { allPets })
})

module.exports = { success , getAdminDashboard, getAllPets, createPet,  getPet, deletePet};