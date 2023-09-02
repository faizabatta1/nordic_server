const express = require('express')
const router = express.Router()

const {
  restartVPS,
  updateNordic,
  prepareBackup
} = require('../utils/vps_service')

const { downloadBackup } = require('../utils/scp_backup')

router.get('/vps/restart',(req,res) =>{
  try{
    restartVPS()
    return res.sendStatus(200)
  }catch(error){
    console.log(error.message)
  }
})

router.get('/vps/update',(req,res) =>{
  try{
    updateNordic()
    return res.sendStatus(200)
  }catch(error){
    console.log(error.message)
  }
})

router.get('/vps/backup/prepare',async (req,res) =>{
  try{
    prepareBackup()
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).send(error.message)
  }
})

router.get('/vps/backup/download',async (req,res) =>{
  try{
    await downloadBackup();
    return res.sendStatus(200)
  }catch(error){
    return res.status(500).send(error.message)
  }
})


module.exports = router