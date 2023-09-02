const express = require('express')
const router = express.Router()

const {
  restartVPS,
  updateNordic
} = require('../utils/vps_service')

router.get('/vps/restart',(req,res) =>{
  try{
    let data = restartVPS()
    return res.status(200).send(data)
  }catch(error){
    console.log(error.message)
  }
})

router.get('/vps/update',(req,res) =>{
  try{
    let data = updateNordic()
    return res.status(200).send(data)
  }catch(error){
    console.log(error.message)
  }
})

router.get('/vps/backup/prepare',async (req,res) =>{

})

router.get('/vps/backup/download')


module.exports = router