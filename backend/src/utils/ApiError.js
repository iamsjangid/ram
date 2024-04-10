const httpStatus = require("http-status");

class ApiError extends Error{
    statusCode  = httpStatus.INTERNAL_SERVER_ERROR
    constructor(statusCode,message){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        if(this.stack){
            this.stack = this.stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

module.exports = {
    ApiError
}