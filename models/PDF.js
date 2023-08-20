const mongoose = require('mongoose')

const PDFSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().getUTCFullYear() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCDay()
    },
})

const PDFModel = mongoose.model('PDF', PDFSchema)

module.exports = PDFModel