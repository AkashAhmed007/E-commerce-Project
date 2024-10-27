const createError = require("http-errors");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
const { findWithId } = require("../Service/findItem");
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

module.exports = { getUsers, getUser };
