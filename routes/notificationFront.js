const express = require('express')
const router = express.Router()
const NotificationModel = require('../models/NotificationModel')

router.get('/notifications',async (req,res) =>{
  try{
    let notifications = await NotificationModel.find()
    return res.status(200).render('notifications/read',{
      
    })
  }catch(error){

  }
})

module.exports = router