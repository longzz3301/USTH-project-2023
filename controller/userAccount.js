const express = require('express')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { usermodel } = require('../model/user')





// create account
const createAccount = async (req, res, next) => {
    try {
        const { username, password,FormId } = req.body
    const checkUserExist = await usermodel.findOne({ username: username })

    if (checkUserExist) {
        res.send('user da ton tai')
        next()
    } else {
        const salt = bcrypt.genSaltSync(9)
        const hassPassword = bcrypt.hashSync(password, salt)
        const user = await usermodel.create({ username: username, password: hassPassword, role: 'user',FormId })
        res.send('create success')
    }
        
    } catch (error) {
        res.send(error)
        
    }

}

//authentication login
const authentication = async (req, res, next) => {

    try {
        const { username, password,FormId } = req.body
    const checkUserExist = await usermodel.findOne({ username: username })
    const checkPassword =bcrypt.compareSync(password, checkUserExist.password);
    console.log(checkPassword)
    if (checkUserExist && checkPassword) {
        const token = jwt.sign({ username: username, role: checkUserExist.role, id: checkUserExist._id ,FormId}, 'long123')  // id: checkUserExist._id
        res.send({ token: token })

    } else {
        res.send("user k ton tai")
    }
        
    } catch (error) {
        res.send(error)
        
    }
}


//check token 
const checkToken = async (req, res, next) => {
   try { const token = req.headers.authorization.split(" ")[1]
   const decoded = jwt.verify(token, 'long123')
   const { username } = decoded
   const checkUser = await usermodel.findOne({ username: username }).populate('FormMedical')
   if (checkUser) {
       req.user = checkUser
       next()

   } else {
       res.send('user not exit ')
   }
    
   } catch (error) {
    res.send(error)
    
   }
}

// 

const getUser = async (req, res) => {
    res.send(req.user)
}

const getUserAndForm = async(req,res)=> {
    const username = req.user.username
    const player = await usermodel.find({username}).populate('FormMedical')
    res.send(player)
}

const patchUser = async (req, res, next) => {
    try {const { newname, password } = req.body
    const username = req.params.username
    const checkUserExist = await usermodel.findOne({ username: username })
    if (checkUserExist) {
        const user = await usermodel.findOneAndUpdate({ username: username }, { username: newname, password: password })
        res.send("new update :", user)
    } else {
        res.send("user not found")
    }
        
    } catch (error) {
        res.send(error)
        
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const currentUser = req.user
        if (currentUser === username) {
            res.send("can't not delete")
        }
        const checkUserExist = await usermodel.findOne({ username: username })
        if (checkUserExist) {
            const deletee = await usermodel.deleteOne({ checkUserExist })
            res.send("delete success")
        } else {
            res.send("user not found")
        }
    } catch (error) {
        res.send(error)
        
    }
}


// const UserForm = async(req,res,next) => {
//     const {phone,address,age,sex,pathological}=req.body
//     const user = req.user 
//     const checkUserForm = await usermodel.find({user})
//     if(checkUserForm){
//         const createForm = await FormModel.create({phone,address,age,sex,pathological})
//         res.send("create Form success")
//     }else{
//         res.send("error")
//     }

// }


// const getProfile = async (req,res,next) => {
//     res.send(user)
// }






module.exports = { createAccount, authentication, checkToken, getUser,getUserAndForm }
