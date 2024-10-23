const express = require("express");
const morgan = require("morgan");
const app = express()
const createError = require('http-errors');
const userRouter = require("./Routers/userRouter");
const testRouter = require("./Routers/testRouter");


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users',userRouter)
app.use('/api/test',testRouter)

app.use((req,res,next)=>{
    return next(createError(401, 'route not found.'))
})

app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})

module.exports = app;