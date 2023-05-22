const mongoose = require('mongoose') 

mongoose.connect('mongodb://127.0.0.1:27017/project1');

const doctorSchema = new mongoose.Schema({
    username : String,
    password : String,
    role : String ,
    medicalExaminationDepartment :String
})