const httpStatus = require("http-status")
const { VendorsApplicationModel } = require("../models")
const { ApiError } = require("../utils/ApiError")

class PublicService{

    static async applyVendor(body){
        const {name,email,mobile,gst,type}  = body


        const checkExist = await VendorsApplicationModel.findOne({email})

        if(checkExist){
            throw new ApiError(httpStatus.BAD_REQUEST,"Already Applied Please Contact ")
            return
        }

        await VendorsApplicationModel.create({name,email,mobile,gst,type})

        return {
            msg:"Vendor Applied Successfully"
        }
    }
}


module.exports = PublicService