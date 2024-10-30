const express = require('express');
const { getUsers, getUser, deleteUser, processRegister, activateAccount } = require('../Controllers/userController');
const userRouter = express.Router()

userRouter.post('/process-register', processRegister)
userRouter.post('/verify', activateAccount)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)



module.exports = userRouter;