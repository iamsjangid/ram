const httpStatus = require("http-status"); 
const CatchAsync = require("../utils/CatchAsync");
const ProductService = require("../services/Product.service");

class ProductController{

    static addProduct = CatchAsync(async(req,res)=>{
            const res_obj = await ProductService.addProduct()
          res.status(httpStatus.CREATED).send(res_obj);
 
    })

     static getAllProducts = CatchAsync(async(req,res)=>{
            const res_obj = await ProductService.getAllProducts()
          res.status(httpStatus.OK).send(res_obj);
 
    })

     static getAllCategories = CatchAsync(async(req,res)=>{
            const res_obj = await ProductService.getAllCategories()
          res.status(httpStatus.OK).send(res_obj);
 
    })
   static getProductBySlug = CatchAsync(async(req,res)=>{
            const res_obj = await ProductService.getProductBySlug(req?.params?.slug)
          res.status(httpStatus.OK).send(res_obj);
 
    })


}

module.exports = ProductController