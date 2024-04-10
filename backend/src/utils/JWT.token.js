const jwt = require("jsonwebtoken")
exports.GenerateAuthToken = async(user)=>{
    const token = jwt.sign({userId:user._id},process.env.JWT_KEY,{
        expiresIn:'30d'
    })
    return token
}

exports.GenerateAuthTokenAdmin = async(user)=>{
    const token = jwt.sign({userId:user._id},process.env.JWT_ADMIN_KEY,{
        expiresIn:'30d'
    })
    return token
}