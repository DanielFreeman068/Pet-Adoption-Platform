const Pet = require('../models/Pet');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllPets = asyncWrapper(async (req, res) => {
    const petsArray = await Pet.find({});
    // console.log(petsArray);
    return petsArray; 
});

const createPet = asyncWrapper(async (req, res) => {
    const pet = Pet.create(req.body)
    console.log(req.body)
    return pet;
})

const getPet = asyncWrapper(async (req,res,next) => {
    const {id:petID} = req.params;
    const pet = await Pet.findOne({_id:petID});
    if(!pet){
        return next(createCustomError('No Pet With Id ' + petID, 404))
    }
    res.status(200);
})

const deletePet = asyncWrapper( async (req,res,next) => {
    const {id:petID} = req.params
    const pet = await Pet.findOneAndDelete({_id:petID})
    if(!pet){
        return next(createCustomError('No Pet With Id ' + petID, 404))
    }
    res.status(200);
})

module.exports = {getAllPets, createPet, getPet, deletePet};