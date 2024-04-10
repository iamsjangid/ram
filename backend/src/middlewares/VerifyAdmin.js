const httpStatus = require("http-status");
const { ApiError } = require("../utils/ApiError");
const jwt = require("jsonwebtoken")
 exports.VerifyAdmin=(req, res, next)=> {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    next(new ApiError(httpStatus.UNAUTHORIZED," "))
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_ADMIN_KEY);
    req.user = user.userId;
    next();
  } catch (err) {

    next(new ApiError(httpStatus.BAD_REQUEST,"Token is not valid"))

  }
}