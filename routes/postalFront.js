const express = require('express')
const router = express.Router()
const Postal = require('../models/PostalViolation')

router.get('/postals',async (req,res) =>{
  try{
    let postals = await Postal.find()
    return res.status(200).render('postals/read',{
      postalViolations: postals
    })
  }catch(error){
    return res.status(500).json(error.message)
  }
})

module.exports = router