const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    brand: String,
    category: String,
    subCategory: String,
    productName: String,
    title: String,
    color: String,
    productPrice: Number,
    productSpecification: String,
    fabric: String,
    fitType: String,
    washCare: String,
    otherDescription: String,
    imagesId: String,
    sizeSet: [
        {
            name: String,
            value: String,
            quantity: Number
        }
    ]
},{
    timestamps:true
})

const model = mongoose.model('Products',Schema);

module.exports = model