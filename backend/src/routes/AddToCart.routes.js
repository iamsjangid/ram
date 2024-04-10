const express = require("express");
const { Authentication } = require("../middlewares/JWTValidation");
const ErrorValidation = require("../middlewares/Validation");
const { AddToCartItem,checkoutWithInCartOperations, checkoutPayment } = require("../validations/validate.Validation");
const AddToCartController = require("../controllers/AddToCart.controller");

const router = express.Router()

router.route("/")
.post(Authentication,AddToCartItem,ErrorValidation,AddToCartController.addToCart)


router.route("/checkcart")
.get(Authentication,AddToCartController.checkIntoCart)


router.route("/checkcart/function")
.put(Authentication,checkoutWithInCartOperations,ErrorValidation,AddToCartController.checkoutWithInCartOperations)




router.route("/checkcart/payment")
.post(Authentication,checkoutPayment,ErrorValidation,AddToCartController.checkoutPayment)


router.route("/checkcart/payment-verification")
.post(AddToCartController.checkoutPaymentVerification)





module.exports = router