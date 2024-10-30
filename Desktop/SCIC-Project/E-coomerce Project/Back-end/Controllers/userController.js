const createError = require("http-errors");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
const { findWithId } = require("../Service/findItem");
const { deleteImage } = require("../helper/deleteImage");
const { secret, clientURL } = require("../secret");
const { createJsonWebToken } = require("../helper/jwt");
const sendEmailWithNodemailer = require("../helper/email");
const jwt = require('jsonwebtoken')

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchExp } },
        { email: { $regex: searchExp } },
        { phone: { $regex: searchExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();

    if (!users) throw createError(404, "No users found");

    res.status(200).send({
      message: "Users data returned",
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user"));
      return;
    }
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);
    res.status(200).send({
      success: true,
      messege: "User is returned",
      user,
    });

    if (!user) throw createError(404, "User doesnt found by this id");
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user id"));
      return;
    }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);

    const userImagePath = user.image;
    deleteImage(userImagePath);

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });
    res.status(200).send({
      success: true,
      messege: "User was deleted successfully",
    });
  } catch (error) {
    console.error("User image doesnot exist");
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const userExists = await User.exists({email: email})
    if (userExists) {
      throw createError(409 , 'User Email Exist in the database')
    } 
    const token = createJsonWebToken({ name, email, password, address, phone },secret, '10m')

    const emailData={
      email,
      subject:"Account Activation Email",
      html: `<h2> Hi,${name} </h2>
      <p>Please click here to <a href=${clientURL}/api/users/activate/${token} target="_blank">activate your account</a></p>
      
      `
    }

    try {
     await sendEmailWithNodemailer(emailData)
    } catch (error) {
      next(createError(500,'failed to send verification Email'))
      return
    }


    res.status(201).json({
      success: true,
      message: `go to your ${email} for verification`,
      payload: {token},
    });
  } catch (error) {
    next(error);
  }
};

const activateAccount = async (req,res,next)=>{
  try {
    const token = req.body.token
    if(!token) throw createError(404, 'token not found')
    const decoded = jwt.verify(token, secret)
    const userExists = await User.exists({email: decoded.email})
    if (userExists) {
      throw createError(409 , 'User Email Exist in the database')
    } 


    await User.create(decoded)
    return res.status(201).json({
      success: true,
      message: 'User registered Successful',
    });
  } catch (error) {
    next(error)
  }
}

module.exports = { getUsers, getUser, deleteUser, processRegister, activateAccount };

