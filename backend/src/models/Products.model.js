const mongoose = require("mongoose")
const { isPublishedState } = require("../constant")
const { SlugFn } = require("../utils/Slugify")

const Schema = new mongoose.Schema({

            title:{
                type:String,
                required:true,
                trim:true,
                unique:true
            },
            slug:{
                type:String,
                default:''
            },
            images:{ 
                type:[{
                    file:{
                        type:String,
                    },
                    public_id:{
                        type:String
                    }
                }],
                required:true
            },
            category:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product-category'
            },
            subCategory:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product-category.sub_categories'
            },
            isPublished:{
                type:String,
                enum:Object.keys(isPublishedState),
                default:isPublishedState.UNDER_REVIEW
            },
            isActive:{
                type:Boolean,
                default:true
            },
            subtitle:{
        type:String,
        required:true
    },
    vendor_name:{
        type:String,
        // required:true
        default:'admin'
    },
    old_price:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
     colors:{
        type:[],
        default:[]
    },
    size:{
        type:String,
        default:''
    },
    product_feature:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:1
    },
    patterns:{
        type:String,
        required:true
    },
    print_location:{
        type:String,
        required:true
    },
    tags:{
        type:[],
        default:[]
    },
    finish:{
        type:String,
        required:true
    }

},{
    timestamps:true
})


Schema.pre("save", function(next){
    if(this.isModified("title")){
            this.slug = SlugFn(this.title)
    }
    next()
})

module.exports = mongoose.model("products-data",Schema)