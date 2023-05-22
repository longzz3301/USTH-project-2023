const express = require('express')
const {UserForm} =require('../controller/FormMedical')
const { authentication } = require('../controller/userAccount')
const { checkToken } = require('../controller/userAccount')

const FormRouter = express.Router()

FormRouter.post("/createform" ,UserForm)
// FormRouter.get('/Form',UserForm )

module.exports={FormRouter}