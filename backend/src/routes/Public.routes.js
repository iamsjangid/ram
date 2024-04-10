const express = require("express")
const PublicValidation = require("../validations/public.validation")
const ErrorValidation = require("../middlewares/Validation")
const PulicController = require("../controllers/public.controller")

const router = express.Router()


router.route("/apply-vendor")
.post(PublicValidation.ApplyVendor,ErrorValidation,PulicController.applyVendor)


module.exports  = router