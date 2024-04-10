const httpStatus = require("http-status");
const PublicService = require("../services/Public.service")
const CatchAsync = require("../utils/CatchAsync")

class PulicController{

    static applyVendor= CatchAsync(async(req,res)=>{
            const res_obj = await PublicService.applyVendor(req.body);

            res.status(httpStatus.CREATED).send(res_obj);
    })

}


module.exports = PulicController