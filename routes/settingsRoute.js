const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.put('/settings/credentials', async (req,res) =>{
  const { username,password } = req.body

  const data = JSON.stringify({
    username: username,
    password: password
  })
  fs.writeFileSync(path.join(__dirname,'../data/credentials.json'), data,{
    encoding:'utf-8'
  });

  return res.sendStatus(200)
})

router.put('/settings/emailTemplate', async (req,res) =>{
  
})

router.put('/settings/smsTable', async (req,res) =>{
  
})

module.exports = router