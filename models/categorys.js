const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    }
}, {versionKey: false,timestamps: { createdAt: 'createTime',updatedAt:'updataTime' }})

module.exports = mongoose.model('category',category)