const express = require('express')
const router = express.Router()

const{
    getAllUsers,
    getUsername,
    getPassword,
    createUser,
    deleteUser
} = require("../controller/login")

router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUsername).delete(deleteUser)
router.route("/login")
module.exports = router