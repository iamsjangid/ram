const { body ,param} = require("express-validator")

class VendorsValidation{
    static createVendor = [
    body("name").isString().withMessage("Name Must be String").notEmpty().withMessage("Name Must be String"),
    body("email").isEmail().withMessage("Email Must be String").notEmpty().withMessage("email Must be String").toLowerCase(),
    body("mobile_no").isString().withMessage("Mobile No Must be String").notEmpty().withMessage("mobile No Must be String")
]


static vendorId = [
  param('id').isMongoId().withMessage("vendor is mongo Id").notEmpty().withMessage("vendor id is required"),
];
}



module.exports = VendorsValidation