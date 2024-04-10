const express = require("express")
const { VerifyAdmin } = require("../middlewares/VerifyAdmin")
const { uploadImage } = require("../utils/multer")
const AdminVendorsController = require("../controllers/AdminVendors.controller")
const VendorsValidation = require("../validations/Vendors.validation")
const ErrorValidation = require("../middlewares/Validation")

const router = express.Router()


router.use(VerifyAdmin,(req,res,next)=>next())


router.route("/create")
.post(uploadImage.fields([
    {
        name:'photo',
        maxCount:1
    },
    {
        name:'adhar_card',
        maxCount:1
    },
    {
        name:'agreement',
        maxCount:1
    },
]),VendorsValidation.createVendor,ErrorValidation,AdminVendorsController.createVendor)
.get(AdminVendorsController.getAllVendors)

router.route("/vendor/:id")
.patch(VendorsValidation.vendorId,ErrorValidation,AdminVendorsController.toggleActiveById)
.delete(VendorsValidation.vendorId,ErrorValidation,AdminVendorsController.deleteVendorById)
.get(VendorsValidation.vendorId,ErrorValidation,AdminVendorsController.getVendorById)


module.exports = router

