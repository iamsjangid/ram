const {validationResult} = require("express-validator");
const { ApiError } = require("../utils/ApiError");
const httpStatus = require("http-status");
const ErrorValidation = async (req,res,next)=>{
    const result =await validationResult(req);

    if(!result.isEmpty()){
        console.log(result.array()[0]);
        next(new ApiError(httpStatus.BAD_REQUEST,result.array()[0].msg))
        return
    }
    next()


}

module.exports = ErrorValidation