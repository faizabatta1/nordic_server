const mongoose = require('mongoose')

const PDFArechieveSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true,
    unique: true
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
        default: new Date().toISOString().split('T')[0]
    },
})

const PDFArchieveModel = mongoose.model('PDF', PDFArechieveSchema)

module.exports = PDFArchieveModel