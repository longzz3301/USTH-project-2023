const { use } = require('bcrypt/promises')
const express = require('express')
const {usermodel} = require('../model/user')

const authorization = async (req,res,next) => {
    try {const userRole = req.user.role
        if(userRole.includes('admin')){
            next()
        }else{
            res.send('User khong co quyen')
        }
        
    } catch (error) {
        res.send(error)
        
    }

}

const deleteUser = async (req,res,next) => {
   try { const username =req.params.username 
    const currentUser = req.user
    if(currentUser=== username){
        res.send("can't not delete")
    }
    const checkUserExist = await usermodel.findOne({username:username})
    if(checkUserExist) {
        const deletee = await usermodel.deleteOne({username})
        res.send("delete success")
    }else {
        res.send("user not found")
    }
    
   } catch (error) {
    res.send(error)
    
   }
}

const getAllUser = async (req,res,next) => {
    const users = await usermodel.find({})
    res.send(users)

}

module.exports ={authorization,deleteUser,getAllUser}

