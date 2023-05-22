const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/project1');

const FormMedical = new mongoose.Schema({
    phone: String,
    address: String,
    age: Number,
    sex: {
        type: String,
        // enum: ['MALE','FEMALE']
    },
    pathological: String

})

const FormModel = mongoose.model("FormMedical", FormMedical)

module.exports = { FormModel }
