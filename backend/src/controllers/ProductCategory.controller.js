const httpStatus = require("http-status");
const ProductService = require("../services/ProductCategory.service")
const CatchAsync = require("../utils/CatchAsync")

class ProductCategory{


    static AddCategory = CatchAsync(async(req,res)=>{
        const res_obj = await ProductService.AddCategory(req.body,req?.file);
        res.status(httpStatus.OK).send(res_obj)
    })
    

    static GetAllCategories = CatchAsync(async(req,res)=>{
        const res_obj = await ProductService.GetAllCategories();
        res.status(httpStatus.OK).send(res_obj)
    })

      static AddSubCategory = CatchAsync(async(req,res)=>{
        const res_obj = await ProductService.AddSubCategory(req.body);
        res.status(httpStatus.CREATED).send(res_obj)
    })


       static BasicoperationCategory = CatchAsync(async(req,res)=>{
        const res_obj = await ProductService.BasicoperationCategory(req.body);
        res.status(httpStatus.OK).send(res_obj)
    })

}

module.exports = ProductCategory