const mongoose = require("mongoose")
const {  status_enum ,payment_type} = require("../constant")
const Schema = new mongoose.Schema({
   order_id:{
     type:mongoose.Schema.Types.ObjectId,
        ref:'OrderPayment',
        required:true
    
   },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:Object.keys(status_enum),
        default:status_enum.PENDING
    },
    order_date:{
        type:Date,
        default:Date.now
    },
    paymentType:{
            type:String,
            enum : Object.keys(payment_type),
            default:payment_type.ONLINE
    },
    isPayment:{
        type:Boolean,
        default:false
    }


}, {
    timestamps: true
})


module.exports = mongoose.model("AdminOrders", Schema)