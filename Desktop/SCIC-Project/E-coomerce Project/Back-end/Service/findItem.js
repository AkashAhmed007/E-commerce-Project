const mongoose = require("mongoose");
const User = require("../Models/userModel");
const createError = require('http-errors');

const findWithId = async (id, options={})=>{
    try {
        const item = await User.findById(id,options)
        if(!item) throw Error(404, 'item doesnot exist')
        return item;
    } catch (error) {
        if(error instanceof mongoose.Error){
            throw createError(404,'Invalid item id')
        }
        throw error;
    }
}
module.exports = {findWithId}