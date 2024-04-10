const express = require("express");
const AdminAuthController = require("../controllers/AdminAuth.controller");
const { AdminRegisterUser,AdminLoginUser } = require("../validations/Auth.validation");
const ErrorValidation = require("../middlewares/Validation");
const { VerifyAdmin } = require("../middlewares/VerifyAdmin");

const router = express.Router()

router.route("/")
.post(AdminRegisterUser,ErrorValidation,AdminAuthController.createAdmin)

router.route("/login")
.post(AdminLoginUser,ErrorValidation,AdminAuthController.loginAdmin)


router.route("/profile")
.get(VerifyAdmin,AdminAuthController.VerifyAdmin)



module.exports = router