const express = require('express')
const router = express.Router()

router.put('/settings/credentials', async (req,res) =>{
  const { username,password } = req.body

  console.log(username)
  console.log(password)

  return res.sendStatus(200)
})

router.put('/settings/emailTemplate', async (req,res) =>{
  
})

router.put('/settings/smsTable', async (req,res) =>{
  
})

module.exports = router