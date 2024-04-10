const express = require('express')
const httpStatus = require('http-status')
const { ApiError } = require('./utils/ApiError')
const app = express()
const cors = require("cors");
const morgan = require("morgan");
const { ErrorHandlingMiddleware } = require('./middlewares/ErrorHandling');

// middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes
app.use("/api/v1",require("./routes"))

app.use("*",()=>{
    throw new ApiError(httpStatus.NOT_FOUND,"Page Not Found");
})

// error

app.use(ErrorHandlingMiddleware)

module.exports = app
