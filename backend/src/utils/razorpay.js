const Razorpay = require("razorpay")
const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SCREATE })


 module.exports = {
    razorpay_instance :instance
 }