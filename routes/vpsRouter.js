const express = require('express')
const router = express.Router()

const {
  restartVPS
} = require('../utils/vps_service')

router.get('/vps/restart',(req,res) =>{
  let data = restartVPS()

  return res.status(200).send(data)
})


module.exports = router