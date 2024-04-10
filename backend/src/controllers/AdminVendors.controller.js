const httpStatus = require("http-status");
const AdminVendorsService = require("../services/AdminVendors.service")
const CatchAsync = require("../utils/CatchAsync")

class AdminVendorsController{

    static createVendor = CatchAsync(async(req,res)=>{
        const res_obj = await AdminVendorsService.createVendor(req.body,req.files);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static getAllVendors = CatchAsync(async(req,res)=>{
        const res_obj = await AdminVendorsService.getAllVendors();
        res.status(httpStatus.OK).send(res_obj);
    })
       static toggleActiveById = CatchAsync(async(req,res)=>{
        const res_obj = await AdminVendorsService.toggleActiveById(req.params?.id);
        res.status(httpStatus.OK).send(res_obj);
    })
 static deleteVendorById = CatchAsync(async(req,res)=>{
        const res_obj = await AdminVendorsService.deleteVendorById(req.params?.id);
        res.status(httpStatus.OK).send(res_obj);
    })
     static getVendorById = CatchAsync(async(req,res)=>{
        const res_obj = await AdminVendorsService.getVendorById(req.params?.id);
        res.status(httpStatus.OK).send(res_obj);
    })
    

    
}


module.exports = AdminVendorsController