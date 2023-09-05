const express = require('express')
const router = express.Router()
const Postal = require('../models/PostalViolation')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/drivers/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.get('/postals',async (req,res) =>{
  try{
    let postals = await Postal.find()
    return res.status(200).json(postals)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.post('/postals',upload.single('violation'),async (req,res) =>{
  try{
    console.log(req.body)
    const {
      number,
      pnid,
      reason
    } = req.body

    let postal = new Postal({
      violationNumber: number,
      pnid: pnid,
      reason: reason,
      image: process.env.BASE_URL + req.file.path.split('public')[1].replaceAll('\\','/')
    })

    console.log(postal)
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