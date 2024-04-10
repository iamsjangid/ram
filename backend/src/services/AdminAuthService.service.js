const httpStatus = require("http-status");
const { AdminUserModel } = require("../models");
const { ApiError } = require("../utils/ApiError");
const { GenerateAuthTokenAdmin } = require("../utils/JWT.token");

class AdminAuthService{


    static createAccount =async(body)=>{
       

        const {email,password} =body;

        const checkExistUser = await AdminUserModel.findOne({email})
        if(checkExistUser){
          throw new ApiError(httpStatus.BAD_REQUEST,"email Adready Exist")
          return 
        }

       
     const userr =   await AdminUserModel.create({email,password})
       return {
        msg:"admin created",
        passKey :userr.passCode
       }


    }

    static loginAdmin =async(body)=>{
       

        const {email,password,passkey} =body;

        const checkExistUser = await AdminUserModel.findOne({email,passCode:passkey})
        if(!checkExistUser){ 
          throw new ApiError(httpStatus.BAD_REQUEST,"invalid Credentials")
          return 
        }

        const isMatch = await checkExistUser.ComparePassword(password)
        if(!isMatch){ 

             throw new ApiError(httpStatus.BAD_REQUEST,"invalid login credentials")
            return 
        }
            const token = await GenerateAuthTokenAdmin(checkExistUser)
       return {
        msg:"admin login", 
        token
       }


    }

     static VerifyAdmin =async(user)=>{
        

        const checkExistUser = await AdminUserModel.findById(user).select("email -_id")
        if(!checkExistUser){ 
          throw new ApiError(httpStatus.BAD_REQUEST,"invalid Credentials")
          return 
        }

        
       return {
        msg:"login success",
        user:checkExistUser
       }


    }
    

}

module.exports = AdminAuthService