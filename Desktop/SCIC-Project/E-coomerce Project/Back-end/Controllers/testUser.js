const data = require("../data")
const User = require("../Models/userModel")

const testUser = async (req,res,next)=>{
    try {
        //deleting all existing user
        await User.deleteMany({})

        //insert new users
       const users =  await User.insertMany(data.users)

       return res.status(201).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports={testUser}