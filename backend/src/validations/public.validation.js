const  { body  }   = require("express-validator")
class PublicValidation{
            static ApplyVendor = [
                body("name").isString().withMessage("Name is Required").notEmpty().withMessage("Name is Required"),
                body("email").isEmail().withMessage("Email is Required").notEmpty().withMessage("Email is Required").toLowerCase(),
               body('mobile')
                        .isString().withMessage('Mobile must be a string')
                        .isInt().withMessage('Mobile must be an integer')
                        .notEmpty().withMessage('Mobile is required')
                        .isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),
                  body('gst')
    .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/)
    .withMessage('Invalid GST number format')
    .notEmpty().withMessage('GST number is required'),
    body("type").isString().notEmpty().withMessage("type is Required")

            ]
}

module.exports = PublicValidation