const { body,query } = require("express-validator");


const AddToCartItem = [
    body("item").isString().withMessage("item is required").isMongoId().withMessage("item must be a mongodb id")
   
]
const checkoutWithInCartOperations = [
    query("q").isString().withMessage("query is required").toUpperCase(),
    body("item").isString().withMessage("item is required").isMongoId().withMessage("item must be a mongodb id")

]


const checkoutPayment = [
    body("name").isString().withMessage("name must be a string").notEmpty().withMessage("name is required"),
   body("email").isString().isEmail().withMessage("email must be valid").notEmpty().withMessage("email is required"),
    body("address").isString().withMessage("Address must be a string").notEmpty().withMessage("Address is required"),
   
]


module.exports = {
AddToCartItem,
checkoutWithInCartOperations,
checkoutPayment
}