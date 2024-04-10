const express = require('express');
const ProductCategory = require('../controllers/ProductCategory.controller');
const ErrorValidation = require('../middlewares/Validation');
const ProductValidation = require('../validations/Products.validation');
const { VerifyAdmin } = require('../middlewares/VerifyAdmin');
const { uploadImage } = require('../utils/multer');


const router = express.Router();

router.route("/")
.get(VerifyAdmin,ProductCategory.GetAllCategories)
router.route("/add")
.post(VerifyAdmin,uploadImage.single("image"), ProductValidation.Category,ErrorValidation, ProductCategory.AddCategory)

router.route("/add/sub")
.post(VerifyAdmin,ProductValidation.AddSubCategory,ErrorValidation,ProductCategory.AddSubCategory)



router.route("/operations")
.post(VerifyAdmin,ProductValidation.OperationCategory,ErrorValidation,ProductCategory.BasicoperationCategory)

module.exports = router