const mongoose = require('mongoose')    
const OrderPaymentSchema =new  mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    total_amount:{
        type:Number,
        required:true
    },
    products:{
        type:[{
            product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Products'
            },
            qty:{
                type:Number,
                required:true
            }
        }]
    },
    shipping_details:{
        type:{
            name:{
                type:String
            },
            email:{
                type:String
            },
            address:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    },
    payment_details:{
        type:{
             order_id:{
                type:String,
                default:''
            },
            razorpay_id:{
                type:String,
                default:''
            },
            razorpay_signature:{
                type:String,
                default:''
            },

        }
    },
    isPaymentDone:{
        type:Boolean,
        default:false
    }

   
},{
     timestamps:true
})
const model =  mongoose.model( 'OrderPayment' , OrderPaymentSchema)

module.exports = model