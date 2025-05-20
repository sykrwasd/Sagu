const mongoose = require('mongoose')
const Sales = new mongoose.Schema({
    name : {type: String, required: true},
    quantity : {type: String, required: true},
    location : {type: String, required: true},
    progress : {type: String, required: true},
    Date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('sales',Sales)