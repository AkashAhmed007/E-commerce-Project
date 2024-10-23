const express = require('express');
const { getUsers } = require('../Controllers/userController');
const userRouter = express.Router()

userRouter.get('/', getUsers)


module.exports = userRouter;