const httpStatus = require("http-status");
const { UserModel, ProfileModel } = require("../models");
const { ApiError } = require("../utils/ApiError");
const { GenerateAuthToken } = require("../utils/JWT.token");

class AuthService{
static async  registerUser(body){
        const {name,email,password} = body
    const checkExist = await UserModel.findOne({email});
    if(checkExist){
        throw new ApiError(httpStatus.BAD_REQUEST,"user Already Exist");
        return
    }


    const userData = await UserModel.create({
        name,email,password
    })

        await ProfileModel.create({
            user:userData._id
        })

        const token = await GenerateAuthToken(userData);

        return {
            msg:"User Register Successfully",
            access_token:token,
            reqTime:new Date().toLocaleString()
            
        }


}

static async  loginUser(body){
        const {email,password} = body
    const checkExist = await UserModel.findOne({email});
    if(!checkExist){
        throw new ApiError(httpStatus.BAD_REQUEST,"user Not Exist");
        return
    }


            const isMatch = await checkExist.ComparePassword(password)
            if(!isMatch){
                throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Credentials");
                return
            }
            

        const token = await GenerateAuthToken(checkExist);

        return {
            msg:"User Login Successfully",
            access_token:token,
            reqTime:new Date().toLocaleString()
            
        }


}

static async profileUser(user){
    const existUser = await UserModel.findById(user);

        if(!existUser){
            throw new ApiError(httpStatus.BAD_REQUEST,"User Not Found");
                return
        }


        const userData = await ProfileModel.findOne({user:user}).populate("user","name email -_id");

        return {
            msg:"profile fetched",
            profile:userData
        }

}

}

module.exports = AuthService