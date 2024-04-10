const httpStatus = require("http-status");
const { CartModel,OrderPaymentModel  , AdminOrdersModel} = require("../models");
const { ApiError } = require("../utils/ApiError");
const { razorpay_instance } = require("../utils/razorpay");
const crypto = require("crypto");
const { payment_type ,defaultCheckout} = require("../constant");
class AddToCartService{

    static addToCart = async(user,body)=>{
        const {item} = body
 

          const existingProduct = await CartModel.findOne({ user, product: item });
          
        if (!existingProduct) {
            // If the product doesn't exist, create a new cart entry with quantity 1
            await CartModel.create({ user, product: item, qty: 1 });

            return {
                msg: "Item added to the cart",
            };
        }

        // If the product already exists, increment the quantity
        await CartModel.findByIdAndUpdate(existingProduct._id, { $inc: { qty: 1 } });

        return {
            msg: "Item added to the cart",
        };
        
    }

    static checkIntoCart = async(user)=>{
           const existingProduct = await CartModel.find({ user, ...defaultCheckout })
        //    .populate("product","title images ").
                 .populate({
        path: 'product',
        select: 'title images price',
        populate: {
            path: 'images',
            select: 'file' // Include only the 'file' field from the 'images' array
        }
    }).  
        select("-user -createdAt -isDeliverDone -isOrderCancel -isPaymentDone -isPresent");
// createdAt
// : 
// "2024-03-23T15:21:48.863Z"
// isDeliverDone
// : 
// false
// isOrderCancel
// : 
// false
// isPaymentDone
// : 
// false
// isPresent
// : 
// true
    //        const existingProducts = await CartModel.find({ user, isPresent: true })
    // .populate({
    //     path: 'product',
    //     select: 'title images',
    //     populate: {
    //         path: 'images',
    //         select: 'file' // Include only the 'file' field from the 'images' array
    //     }
    // })
    // .select('-user');


           let totalPrice = 0 
           if(existingProduct.length>0){
                            if(existingProduct.length===1){ 
                                totalPrice = await existingProduct.map((cur) => cur.product.price * cur.qty)
                                    
                            }else{
 
                                
                                totalPrice = await existingProduct.map((cur) => cur.product.price * cur.qty)
                                .reduce((accumulator, currentValue) => accumulator + currentValue);
                            }
            } 
 
 

       return {
        products: existingProduct,
        total:existingProduct.length,
        totalPrice,
        shipping:0
       }
    }

    static checkoutWithInCartOperations = async(user,query,body)=>{
        
        const {q} = query
        
        const existingProduct = await CartModel.findOne({ user, _id: body.item });

        if(!existingProduct){
                throw new ApiError(httpStatus.BAD_REQUEST,"Product not found")
                return
        }

        if(q === 'ADD'){
                     await CartModel.findByIdAndUpdate(existingProduct._id, { $inc: { qty: 1 } });

                     return {
                        msg:"Product Quantity increased"
                     }
        }

         if(q === 'MINUS'){
            if(existingProduct.qty ===1){
                await CartModel.findByIdAndDelete(existingProduct._id)
                return {
                    msg:"Item removed from Cart"
                }
            }
                     await CartModel.findByIdAndUpdate(existingProduct._id, { $inc: { qty: -1 } });

                     return {
                        msg:"Product Quantity increased"
                     }
        }

         if(q === 'DELETE'){
             await CartModel.findByIdAndDelete(existingProduct._id)
               return {
                        msg:"Item Deleted"
                     }
        }

        

    }

    static checkoutPayment = async(user,body)=>{

        const existingProduct = await CartModel.find({ user,...defaultCheckout }).populate("product","title images price category").select("-user");
          
        
        
        if(existingProduct.length<1){
                                    throw new ApiError(httpStatus.BAD_REQUEST,"not able for checkout")
                                    return
                                 
       }
               


       const products = await existingProduct.map((cur)=>({qty: cur.qty, product:cur.product  }))
 
          const totalPrice =  await existingProduct.map((cur) => cur.product.price * cur.qty)
                                .reduce((accumulator, currentValue) => accumulator + currentValue);

       const order_data = await razorpay_instance.orders.create({
         amount: Number(totalPrice*100),
  currency: "INR",
  receipt:`${new Date().getTime()}`,
       })


       const option = {
        user:user,
        total_amount:totalPrice,
        products,
        shipping_details:{
                    name:body.name,
                    email:body.email,
                    address:body.address
        },
        payment_details:{
            order_id:order_data.id,
        }
       }
                // -----------------------------------------------------
                        //  await  existingProduct.map(async(cur,i)=>{
                        //                 await CartModel.findByIdAndUpdate(cur._id,{
                        //                     order_id:order_data.id
                        //                 })
                        //             })

                await Promise.all(existingProduct.map(async (cur) => {
                        await CartModel.findByIdAndUpdate(cur._id, {
                        order_id: option.payment_details.order_id
                        });
                }));


    const order=    await OrderPaymentModel.create(option)

       await AdminOrdersModel.create({
        user:user,
        order_id:order._id,
       })

       return {
        order:order_data
       }






        
    }

    static checkoutPaymentVerification= async(body)=>{
            const{razorpay_payment_id,razorpay_order_id,razorpay_signature} = body

    const body_data= razorpay_order_id+"|"+razorpay_payment_id

   const expect=  crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SCREATE).update(body_data).digest("hex")


    const isValid = expect===razorpay_signature;

    const updatedPaymentDetails = {
    order_id: razorpay_order_id,
    razorpay_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
};
    if(isValid){
     const data =    await OrderPaymentModel.findOneAndUpdate({
                    "payment_details.order_id":razorpay_order_id
        },{
            $set:{ "payment_details": updatedPaymentDetails, "isPaymentDone": true }
        })
               
            // -----------------------------------------------

            await CartModel.updateMany({order_id: razorpay_order_id}, {
                     isPaymentDone:true,
            });
                  

         await AdminOrdersModel.findOneAndUpdate({ order_id:data._id },{
        isPayment:true,
        paymentType:payment_type.ONLINE
       })
        
        return{
            url:`http://localhost:3000/payment/success?payment_id=${razorpay_payment_id}`
        }
    }
    else{
        
        
         return{
            url:`http://localhost:3000/payment/failed`
        } 
    }

    }
            
}

module.exports = AddToCartService