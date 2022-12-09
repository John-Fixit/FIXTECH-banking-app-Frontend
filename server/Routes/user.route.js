
const express = require('express')
const userRouter = express.Router()
const userController = require('../Controller/user.controller')
const passport = require('passport')
require('dotenv').config()
userRouter.get('/', userController.getRes)
userRouter.post('/auth', userController.signup)
userRouter.post('/authLogin', userController.signin)
userRouter.get('/authorizeUser', userController.authorizeFunc)
userRouter.post('/uploadUserPicture', userController.uploadUserPicture)
userRouter.get('/getUserDetail/:id', userController.getUserDetail)
userRouter.get('/users', userController.getAllUsers)
userRouter.post('/transfer', userController.transferFunc)
userRouter.post('/topUpWithCard', userController.topUpWithCard)
userRouter.get('/checkUser/:id', userController.checkUser)

module.exports = userRouter