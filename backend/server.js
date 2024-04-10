const dotenv = require("dotenv")
dotenv.config({
    path:"./.env.local"
})

const app = require("./src/app");
const { DBConnect } = require("./src/config/db.config");

const port = process.env.PORT || 5000

// db connection
DBConnect()


app.listen(port,()=>{
    console.log(`the app is listen at http://localhost:${port}`);
})