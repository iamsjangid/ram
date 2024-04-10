const mongoose = require("mongoose")
const DBConnect = async()=>{
    try {
                await mongoose.connect(process.env.MONGO_URI);
                console.log(`the db is connect with ${mongoose.connection.host}`);
    } catch (error) {
            mongoose.disconnect();
            // console.log(error);
            process.exit(1)
    }
}

 module.exports = {
    DBConnect
 }