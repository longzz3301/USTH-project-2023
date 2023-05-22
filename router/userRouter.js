const express = require('express')
const { createAccount, checkToken, authentication, getUser,getUserAndForm } = require('../controller/userAccount')
const {UserForm} =require('../controller/FormMedical')

const userRouter = express.Router()

userRouter.post('/registers', createAccount)

userRouter.post('/login',authentication)

userRouter.get('/get',checkToken,getUser,)

userRouter.get('/getUserAndForm',checkToken,getUserAndForm)


module.exports ={userRouter}
