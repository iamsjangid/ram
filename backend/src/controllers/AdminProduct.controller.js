const httpStatus = require("http-status"); 
const CatchAsync = require("../utils/CatchAsync");
const AdminProductService = require("../services/AdminProduct.service");

class AdminProductController{
    static AddProduct = CatchAsync(async(req,res)=>{
        const res_obj = await AdminProductService.AddProduct(req.body,req?.files);

        res.status(httpStatus.OK).send(res_obj);
    })

   static GetProducts = CatchAsync(async(req,res)=>{
        const res_obj = await AdminProductService.GetProducts();

        res.status(httpStatus.OK).send(res_obj);
    })
       static GetProductsHome = CatchAsync(async(req,res)=>{
        const res_obj = await AdminProductService.GetProductsHome();

        res.status(httpStatus.OK).send(res_obj);
    })
 static getAllOrders = CatchAsync(async(req,res)=>{
        const res_obj = await AdminProductService.getAllOrders();

        res.status(httpStatus.OK).send(res_obj);
    })

    static getAllOrdersById = CatchAsync(async(req,res)=>{
             const res_obj = await AdminProductService.getAllOrdersById(req?.params?.id);

        res.status(httpStatus.OK).send(res_obj);
    })

      static updateStatusById = CatchAsync(async(req,res)=>{
             const res_obj = await AdminProductService.updateStatusById(req?.params?.id,req?.body);

        res.status(httpStatus.OK).send(res_obj);
    })


    
}

module.exports = AdminProductController