const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            lower:true
        },
        type:{
            type:String,
            required:true,
            enum:['supplier', 'designer']
        },
        mobile:{
            type:String,
            required:true
        },
        gst:{
            type:String,
            required:true
        },
        isRejected:{
            type:Boolean,
            default:false
        },
        isAccepted:{
            type:Boolean,
            default:false
        },
        application_date:{
            type:Date,
            default:Date.now
        }
},{timestamps:true})

module.exports = mongoose.model("VendorApplication",Schema)