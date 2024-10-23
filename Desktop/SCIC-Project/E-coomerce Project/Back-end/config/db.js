const mongoose = require ('mongoose')
const { mongoURL } = require('../secret')
const connectDB = async()=>{
    try {
        await mongoose.connect(mongoURL)
        console.log("MongoDB connection successful")
        mongoose.connection.on('error',()=>{
            console.error("DB connection error",error)
        })
    } catch (error) {
        console.error("couldn't connect with DB",error.toString())
    }
}

module.exports = connectDB