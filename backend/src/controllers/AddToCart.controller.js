const httpStatus = require("http-status"); 
const CatchAsync = require("../utils/CatchAsync");
const AddToCartService = require("../services/AddToCart.service");

class AddToCartController{
        static addToCart = CatchAsync(async(req,res)=>{
    const res_obj = await AddToCartService.addToCart(req.user,req.body);
    res.status(httpStatus.OK).send(res_obj);
})

 static checkIntoCart = CatchAsync(async(req,res)=>{
    const res_obj = await AddToCartService.checkIntoCart(req.user);
    res.status(httpStatus.OK).send(res_obj);
})


 static checkoutWithInCartOperations = CatchAsync(async(req,res)=>{
    const res_obj = await AddToCartService.checkoutWithInCartOperations(req.user,req?.query,req?.body);
    res.status(httpStatus.OK).send(res_obj);
})
static checkoutPayment = CatchAsync(async(req,res)=>{
    const res_obj = await AddToCartService.checkoutPayment(req.user,req?.body);
    res.status(httpStatus.OK).send(res_obj);
})

static checkoutPaymentVerification = CatchAsync(async(req,res)=>{
    const res_obj = await AddToCartService.checkoutPaymentVerification(req?.body);
    res.status(httpStatus.OK).redirect(res_obj.url)
})




}

module.exports = AddToCartController