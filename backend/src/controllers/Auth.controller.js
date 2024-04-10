const httpStatus = require("http-status");
const AuthService = require("../services/Auth.service")
const CatchAsync = require("../utils/CatchAsync")

class AuthController{
static registerUser = CatchAsync(async(req,res)=>{
    const res_obj = await AuthService.registerUser(req.body);
    res.status(httpStatus.CREATED).send(res_obj);
})

static loginUser = CatchAsync(async(req,res)=>{
    const res_obj = await AuthService.loginUser(req.body);
    res.status(httpStatus.OK).send(res_obj);
})
static profileUser = CatchAsync(async(req,res)=>{
    const res_obj = await AuthService.profileUser(req.user);
    res.status(httpStatus.OK).send(res_obj);
})




}

module.exports = AuthController