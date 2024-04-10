const httpStatus = require("http-status"); 
const CatchAsync = require("../utils/CatchAsync");
const AdminAuthService = require("../services/AdminAuthService.service");

class AdminAuthController{

    static createAdmin = CatchAsync(async(req,res)=>{
        const res_obj = await AdminAuthService.createAccount(req.body)
        res.status(httpStatus.CREATED).send(res_obj)
    })
      static loginAdmin = CatchAsync(async(req,res)=>{
        const res_obj = await AdminAuthService.loginAdmin(req.body)
        res.status(httpStatus.CREATED).send(res_obj)
    })
       static VerifyAdmin = CatchAsync(async(req,res)=>{
        const res_obj = await AdminAuthService.VerifyAdmin(req.user)
        res.status(httpStatus.CREATED).send(res_obj)
    })


    
}

module.exports = AdminAuthController