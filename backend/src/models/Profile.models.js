const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const userNameGen = ()=>faker.internet.userName()
const Schema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
        userName:{
            type:String,
            default:userNameGen
        },
        mobile:{
            type:String,
            default:null
        },
        isMobileVerified:{
            type:Boolean,
            default:false
        },
        isEmailVerified:{
            type:Boolean,
            default:false
        },
        address:{
            type:Array,
            default:[]
        }
        
},{
    timestamps:true
})

const model = mongoose.model("profile",Schema);

module.exports = model