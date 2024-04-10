const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products-data'
            },
            qty:{
                type:Number,
                required:true
            },
            isPresent:{
                type:Boolean,
                default:true
            },
            isPaymentDone:{
                type:Boolean,
                default:false
            },
            isDeliverDone:{
                type:Boolean,
                default:false
            },
            isOrderCancel:{
                type:Boolean,
                default:false
            },
            order_id:{
                type:String,
                default:''
            }
},{
    timestamps:true
})

const model = mongoose.model("addtocart",Schema)

module.exports = model