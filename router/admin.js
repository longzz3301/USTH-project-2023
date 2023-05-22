const express = require("express")
const {  checkToken, authentication } = require("../controller/userAccount")
const {  authorization, deleteUser, getAllUser } = require("../controller/admin")

const adminRouter = express.Router()


adminRouter.get('/getUser' ,checkToken,authorization,getAllUser )
adminRouter.delete('/delete/:username',checkToken,authorization,deleteUser)

module.exports = {adminRouter}