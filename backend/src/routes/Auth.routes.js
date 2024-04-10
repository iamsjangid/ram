const express = require('express')
const AuthController = require('../controllers/Auth.controller')
const { RegisterUser, LoginUser } = require('../validations/Auth.validation')
const ErrorValidation = require('../middlewares/Validation')
const { Authentication } = require('../middlewares/JWTValidation')
const router = express.Router()


router.route("/register")
.post(RegisterUser,ErrorValidation,AuthController.registerUser)

router.route("/login")
.post(LoginUser,ErrorValidation,AuthController.loginUser)


router.route("/profile")
.get(Authentication,AuthController.profileUser)

module.exports = router
