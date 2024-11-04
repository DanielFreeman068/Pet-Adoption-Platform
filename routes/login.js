const express = require('express') // call express library and router 
const router = express.Router()

const{ // pull all function as vars from login controller
    getAllUsers,
    getUsername,
    getPassword,
    createUser,
    deleteUser
} = require("../controller/login")

router.get("/login", (req, res) => { // render login page
    res.render('login');
})

router.route("/all").get(getAllUsers) // set routes, methods to run when routes are called
router.route("/signup").post(createUser)
router.route("/:id").get(getUsername).delete(deleteUser)
router.route("/:id/password").get(getPassword)

module.exports = router //export router