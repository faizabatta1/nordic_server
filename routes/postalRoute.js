const express = require('express')
const router = express.Router()
const Postal = require('../models/PostalViolation')

router.get('/postals',async (req,res) =>{
  try{
    let postals = await Postal.find()
    return res.status(200).json(postals)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.post('/postals',async (req,res) =>{
  try{
    console.log(req.body)
    let postal = new Postal(req.body)
    await postal.save()
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.put('/postals/:id',async (req,res) =>{
  try{
    await Postal.updateOne({ _id: req.params.id },req.body)
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.delete('/postals/:id',async (req,res) =>{
  try{
    await Postal.deleteOne({ _id: req.params.id })
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.delete('/postals',async (req,res) =>{
  try{
    await Postal.deleteMany({})
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).json(error.message)
  }
})


module.exports = router