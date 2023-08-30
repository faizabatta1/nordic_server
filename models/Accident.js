const mongoose = require('mongoose')

const AccidentSchema = new mongoose.Schema({
    boardNumber:{
        type: String,
        required: true
    },
    privateNumber:{
        type:String,
        required: true
    },
    createdAt:{
      type:String,
      default: new Date().toISOString().split('T')[0]
    },
    username:{
      type:String,
      required:true
    },
    pnid:{
      type:String,
      required: true
    }
})

const AccidentModel = mongoose.model('Car', AccidentSchema)

module.exports = AccidentModel