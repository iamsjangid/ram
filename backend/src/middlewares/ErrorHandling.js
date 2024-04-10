const httpStatus = require("http-status");
const { ApiError } = require("../utils/ApiError");
const { checkDevelopment } = require("../constant");
const multer = require("multer")
const ErrorHandlingMiddleware = (err,req,res,next)=>{
    let obj = {}


    if(err instanceof ApiError){
                obj['statusCode']=err.statusCode;
                obj['message']=err.message;
                obj['stack']=err.stack
            }
                    else if(err instanceof multer.MulterError){
                obj['statusCode']=httpStatus.BAD_REQUEST;
                obj['message']=err.message;
                obj['stack']=err.stack
            }
            else{
                 obj['statusCode']=httpStatus.INTERNAL_SERVER_ERROR;
                 obj['message']=err.message;
                obj['stack']=err.stack
            }

            if (!checkDevelopment()){
                delete obj.stack
            }   
            console.log(obj.message);

            res.status(obj.statusCode).send(obj);


}
module.exports= {
    ErrorHandlingMiddleware
}