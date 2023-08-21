const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    boardNumber:{
        type: String,
        required: true
    },
    privateNumber:{
        type:String,
        required: true
    },
    kilometers:{
        type:Number,
        required: true
    },
    qrcode:{
        type:String,
        required:true
    }
})

const CarModel = mongoose.model('Car', CarSchema)

module.exports = CarModel