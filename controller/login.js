const asyncWrapper = require('../middleware/async');
const login = require("../models/login")
const {createCustomError} = require("../errors/custom-error")
var access

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await login.find({});
    res.status(200).json({users});
})

const getUsername = asyncWrapper(async (req, res) => {
    const {id: userID} = req.params;
    const username = await login.findOne({_id: userID});
    if(!username){
        return next(createCustomError('No account with username: ' + userID, 404))
    }
    res.status(200).json({username});
})

const getPassword = asyncWrapper(async (req, res) => {
    const {id: userID} = req.params;
    const password = await login.findOne({_id: userID});
    if(!password){
        return next(createCustomError('Incorrect Password.', 404))
    }
    res.status(200).json({password});
})

const createUser = asyncWrapper(async (req, res) => {
    const newUser = await login.create(req.body);
    const newPassword = await login.create(req.body);
    res.status(201).json({usernamr: newUser, password: newPassword});
})

const deleteUser = asyncWrapper(async (req, res) => {
    const {id: userID} = req.params;
    const user = await login.findOneAndDelete({_id: userID});
    if(!user){
        return next(createCustomError('No account with username: ' + userID, 404))
    }
    res.status(200).json({message: 'User deleted successfully'});
})

if(username && password){
    
}else{
    
}

module.exports = {
    getAllUsers,
    getUsername,
    getPassword,
    createUser,
    deleteUser
}

