const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lower:true,
        trim:true

    },
    password:{
        type:String,
        required:true,
        trim:true

    },
    isBlock:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})


schema.pre("save",async function(next){
    const user = this

    if(this.isModified("password")){
            user.password = await bcryptjs.hash(user.password,12);

    }
    next()
})




schema.methods.ComparePassword = async function(string_password){
    const isMatch = await bcryptjs.compare(string_password,this.password);
    return isMatch
}

const model = mongoose.model("user",schema);

module.exports = model