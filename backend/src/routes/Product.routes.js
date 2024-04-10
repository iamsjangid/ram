const express = require('express')
const ProductController = require('../controllers/Product.controller')
const AdminProductController = require('../controllers/AdminProduct.controller')

const router = express.Router()


// only for testing purpose
router.route("/list")
// .get(ProductController.getAllProducts)
.get(AdminProductController.GetProductsHome)

// only for testing purpose
.post(ProductController.addProduct)

 
router.route("/category/list") 
.get(ProductController.getAllCategories) 


 
router.route("/data/:slug") 
.get(ProductController.getProductBySlug) 



module.exports = router