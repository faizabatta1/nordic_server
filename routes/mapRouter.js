const express = require('express')
const router = express.Router()
const Map = require('../models/Map')

router.get('/maps', async (req,res)=>{
  try{
    const maps = await Map.find()
    return res.status(200).json(maps)
  }catch(error){
    return res.status(500).json(error.message)
  }
})

router.get('/maps/zone/:id',async (req,res) =>{
  try{
    const { id } = req.params
    const map = await Map.findOne({ zone: id })

    return res.status(200).json(map)

  }catch(error){
    console.log(error)
    return res.status(500).json(error.message)
  }
})

router.post('/maps',async (req,res) =>{
  try{
    let map = new Map(req.body)
    await map.save()
    return res.sendStatus(200)
  }catch(error){
    console.log(error.message)
    return res.status(500).json(error.message)
  }
})

module.exports = router