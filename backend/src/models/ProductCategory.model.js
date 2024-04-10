const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
        sub_categories:{
            type:[{
                title:{
                    type:String
                },
                                        slug:{
                                            type:String
                                        },
                                        isActive:{
                                            type:Boolean,
                                            default:false
                                        }
            }],
            default:[]
        },
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    category_image:{
        type:{
            uri:{
                type:String,
                required:true
            },
            image_id:{
                type:String,
                required:true
            }
        },
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
   

},{
    timestamps:true
})

module.exports = mongoose.model("product-category",Schema);