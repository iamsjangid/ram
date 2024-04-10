const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
 function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}
const schema = new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        passCode:{
            type:Number,
            default:generateRandomNumber
        }
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
 
const model = mongoose.model("admin_user",schema);

module.exports = model

