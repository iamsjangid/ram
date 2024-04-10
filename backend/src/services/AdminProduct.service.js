const httpStatus = require("http-status")
const { AdminProductModel,AdminOrdersModel,CartModel } = require("../models")
const { ApiError } = require("../utils/ApiError")
const { uploadImage } = require("../utils/cloudinary");
const { status_enum } = require("../constant");
// const moment = require("")
class AdminProductService{

    static async AddProduct(body,files){ 
       
        if(!files || files.length<1 ){
          
            throw new ApiError(httpStatus.BAD_REQUEST,"please upload images");
        }

         const {
            title,
            category,
            subCategory,  
            subtitle, 
            old_price,
            price,
            colors,
            size,
            product_feature,
            rating,
            patterns,
            print_location,
            tags,
            finish
        } = body;


        const checkExsitproductName = await AdminProductModel.findOne({title:new RegExp(body.title, 'i')})
        if(checkExsitproductName){
                throw new ApiError(httpStatus.BAD_REQUEST,"Product Already Exist");
            return
        }

        let filesdata = []
          // Upload each file to Cloudinary
    for (const file of files) { 
      const result = await uploadImage(file.path,'products');
      filesdata.push({
        file:result.secure_url,
        public_id:result.public_id
      });
    }

  const product=  await AdminProductModel.create({
  title,
            category,
            subCategory,  
            subtitle, 
            old_price,
            price,
            colors,
            size,
            product_feature,
            rating,
            patterns,
            print_location,
            tags,
            finish,
            images:filesdata
    })
 


        return {
            msg:"product Added",
            body,
            files,
            product
        }
    }

    static async GetProducts(){
        const checkExsitproductName = await AdminProductModel.find({ }).populate("category","-_id")
        .
        // populate("subCategory","-_id").
        select("-_id")


      return {
        msg:"data fetched",
        products:checkExsitproductName,
        total:checkExsitproductName.length
      }
    } 

     static async GetProductsHome(){
        // const checkExsitproductName = await AdminProductModel.find({ }).
         
        // // populate("subCategory","-_id").
        // select("-_id images slug title isPublished price ")

const checkExistProductName = await AdminProductModel.aggregate([
  {
    $project: {
      _id: 1,
      images: { $slice: ['$images', 1] },
      slug: 1,
      title: 1,
      isPublished: 1,
      price: 1,
      tags: 1,
      rating: 1,
      product_feature:1
    }
  }
]);
      return {
        msg:"data fetched",
        products:checkExistProductName,
        total:checkExistProductName.length
      }
    } 


    static async getAllOrders(){
        // const orders = await AdminOrdersModel.find({}).populate("order_id").populate("order_id.products")

        const orders = await AdminOrdersModel.find({})
    .populate("order_id","total_amount products shipping_details payment_details.order_id  -_id")
    .populate("user","name -_id")
    
        

 const obj = [];

if (orders.length > 0) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            for (const order of orders) { 
                const products = [];
                for (const cur_d of order.order_id.products) { 

                    const prod = await AdminProductModel.findById(cur_d.product).select("title images price");
                    products.push({title:prod.title,images:prod.images,price:prod.price,qty:cur_d.qty});
                }
 
                obj.push({
    _id: order._id,
    total_amount: order.order_id.total_amount,
    isPayment: order.isPayment,
    status: order.status,
    qty:order.order_id.products.qty,
    products: products.map((c)=>({_id:c._id,title:c.title,image:c.images[0].file,qty:c.qty}))
});
                // obj[`products`] = [...obj.products,products]
                ;
            }
            resolve(true);
        } catch (error) {
            // console.error(error);
            resolve(false);
        }
    });

    const result = await promise; 
}
      

        return obj
    }


    static async getAllOrdersById(id){

         const orders = await AdminOrdersModel.findById(id)
    .populate("order_id","total_amount products shipping_details payment_details.order_id  -_id")
    .populate("user","name -_id")
      // console.log(orders)

    if(!orders){
      return {}
    }
        
 let obj = {};
 let products = []



   for (const cur_d of orders.order_id.products) { 
                    const prod = await AdminProductModel.findById(cur_d.product).select("title images price");
                    products.push({title:prod.title,images:prod.images,price:prod.price,qty:cur_d.qty});
                }
 
               obj = {
    _id: orders._id,
    total_amount: orders.order_id.total_amount,
    isPayment: orders.isPayment,
    status: orders.status,
    paymentType:orders.paymentType,
    user:orders.user,
    shipping_details:orders.order_id.shipping_details,
order_date:orders.order_date,
    qty:orders.order_id.products.qty,
    products: products.map((c)=>({_id:c._id,title:c.title,image:c.images[0].file,qty:c.qty,price:c.price}))
};


      return obj
    }


    static async updateStatusById(id,body){
              const orders = await AdminOrdersModel.findById(id)
        const {status} = body
              if(!orders){
                throw new ApiError(httpStatus.BAD_REQUEST,"Order Not Found")
                return
              }

                if (!Object.values(status_enum).includes(status)) {
                throw new ApiError(httpStatus.BAD_REQUEST,"Invalid status value")

    }


    await AdminOrdersModel.findByIdAndUpdate(orders._id,{
          status:status
    })


    await  CartModel.updateMany({order_id:orders.order_id},{
          isOrderCancel: status_enum.CANCEL === status ? true :false,
          isDeliverDone: status_enum.DELIVERED === status ? true :false,
    })
    
        return {
          msg:"Status Update"
        }


    }

}

module.exports = AdminProductService