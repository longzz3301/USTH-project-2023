const express =require('express')

const {FormModel} = require('../model/FormMedical')

// const FormMedicalRouter =express.Router()

const UserForm = async(req,res,next) => {

    try {
        const {phone,address,age,sex,pathological}=req.body
    const createForm = await FormModel.create({phone,address,age,sex,pathological})
    res.send(createForm  )
    
        
    } catch (error) {
        console.log('error',error)
        res.send('sever errpr')
        
    }

}

module.exports ={UserForm}