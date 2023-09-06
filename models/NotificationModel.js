const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  createdAt:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  imeis:{
    type: [String],
    default: ['*']
  },
  zones:{
    type: [String],
    default: ['*']
  }
})

const NotificationModel = mongoose.model('Notification',notificationSchema)
module.exports = NotificationModel