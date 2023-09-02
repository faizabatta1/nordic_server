const express = require('express')
const router = express.Router()

const {
  restartVPS
} = require('../utils/vps_service')

router.get('/vps/restart',(req,res) =>{
  try{
    let data = restartVPS()
    return res.status(200).send(data)
  }catch(error){
    console.log(error.message)
  }
})


module.exports = router