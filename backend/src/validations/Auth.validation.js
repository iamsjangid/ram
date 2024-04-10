const { body} = require("express-validator");


const RegisterUser = [
    body("name").isString().withMessage("name must be a string").notEmpty().withMessage("name is required"),
    body("email").isString().isEmail().withMessage("email must be valid").notEmpty().withMessage("email is required"),
    body("password").isString().withMessage("password is required").notEmpty().withMessage("password is required"),
]

const AdminRegisterUser = [ 
    body("email").isString().withMessage("email must be valid").isEmail().withMessage("email must be valid").notEmpty().withMessage("email is required"),
    body("password").isString().withMessage("password is required").notEmpty().withMessage("password is required"),
]

const LoginUser = [
    body("email").isString().withMessage("email must be valid").isEmail().withMessage("email must be valid").notEmpty().withMessage("email is required"),
    body("password").isString().withMessage("password is required").notEmpty().withMessage("password is required"),
]

const AdminLoginUser = [ 
    body("email").isString().withMessage("email must be valid").isEmail().withMessage("email must be valid").notEmpty().withMessage("email is required"),
    body("password").isString().withMessage("password is required").notEmpty().withMessage("password is required"),
    body("passkey").isNumeric().withMessage("passkey is required").notEmpty().withMessage("passkey is required"),
]
module.exports = {
    RegisterUser,
    LoginUser,
    AdminRegisterUser,
    AdminLoginUser
}