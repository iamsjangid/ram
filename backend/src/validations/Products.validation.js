const {  body , param} = require("express-validator")


class ProductValidation {
    static Category = [

  // Validate 'title' field
  body('title').isString().withMessage("title is required").notEmpty().withMessage("title is required"),
];

 static AddSubCategory = [
  body('category').isMongoId().withMessage("category is mongo Id").notEmpty().withMessage("category is required"),
  body('subCategory').isString().withMessage("subCategory is required").notEmpty().withMessage("subCategory is required"),
];


static OperationCategory = [
  body('operation').isString().withMessage("operation is required").notEmpty().withMessage("operation is required"),
  body('id').isMongoId().withMessage("enter valid  Id").notEmpty().withMessage("id is required"),
  body('sub_id').isMongoId().withMessage("enter valid  Id").optional(),
];


static AddProduct=[
  body('title').notEmpty().withMessage('Title is required'),
    body('subtitle').notEmpty().withMessage('Subtitle is required'), 
    body('category').isMongoId().withMessage('Category must be a valid MongoDB ID'),
    body('subCategory').isMongoId().withMessage('SubCategory must be a valid MongoDB ID'),
    body('old_price').isNumeric().withMessage('Old price must be a number'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('colors').optional().isArray().withMessage('Colors must be an array'),
    body('size').optional().isString().withMessage('Size must be a string'),
    body('product_feature').notEmpty().withMessage('Product feature is required'),
    body('rating').isNumeric().isFloat({ max: 5 }).withMessage('Rating must be a number less than or equal to 5'),
    body('patterns').isString().withMessage('Patterns must be a string'),
    body('print_location').isString().withMessage('Print location must be a string'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('finish').isString().withMessage('Finish must be a string'),
]


 static AdminProductId = [
  param('id').isMongoId().withMessage("product is mongo Id").notEmpty().withMessage("product id is required"),
];

static updateProductIdAndUpdate = [
  param('id').isMongoId().withMessage("product is mongo Id").notEmpty().withMessage("product id is required"),
    body('status').isString().withMessage('status is Required').notEmpty().withMessage("Status is Required").toUpperCase(),

];



}


module.exports = ProductValidation