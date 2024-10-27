const express = require('express');
const { getUsers, getUser } = require('../Controllers/userController');
const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)


module.exports = userRouter;