const express = require("express")
const ErrorValidation = require("../middlewares/Validation");
const { VerifyAdmin } = require("../middlewares/VerifyAdmin");
const AdminProductController = require("../controllers/AdminProduct.controller");
const { AddProduct } = require("../validations/Products.validation");
const { uploadImage } = require("../utils/multer");
const ProductValidation = require("../validations/Products.validation");
const router = express.Router()


router.route("/add")
.post(VerifyAdmin,uploadImage.any(), 
(req,res,next)=>{
    next()
},
//  AddProduct,ErrorValidation,

AdminProductController.AddProduct)
 

router.route("/get-products")
.get(
    VerifyAdmin,
    AdminProductController.GetProducts)
    
router.route("/get-products-home")
.get(
    VerifyAdmin,
    AdminProductController.GetProductsHome)


        
router.route("/get-all-orders")
.get(
    VerifyAdmin,
    AdminProductController.getAllOrders)



    
        
router.route("/get-all-orders/:id")
.get(
            ProductValidation.AdminProductId,
            ErrorValidation,
    VerifyAdmin,
    AdminProductController.getAllOrdersById)
.put(
            ProductValidation.updateProductIdAndUpdate,
            ErrorValidation,
    // VerifyAdmin,
    AdminProductController.updateStatusById)

    

module.exports = router