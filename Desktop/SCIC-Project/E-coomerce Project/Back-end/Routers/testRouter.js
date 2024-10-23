const express = require('express')
const { testUser } = require('../Controllers/testUser')
const testRouter = express.Router()

testRouter.get('/user', testUser)  

module.exports = testRouter;