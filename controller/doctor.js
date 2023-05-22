const express = require('express')
const { usermodel } = require('../model/user')


const checkDoctor = async (req,res,next) => {
    const DoctorRole = req.user.role
    if(DoctorRole.includes(Doctor)){
        next()
    }else {
        res.send('error')
    }
}

const getPatient = async (req,res,next) =>{
    const findPatient = req.params.username
    const checkPatientExits = await usermodel.findOne({findPatient})
    if(checkPatientExits){
        res.send('getForm')
    }else{
        res.send('user not exist')
    }
}