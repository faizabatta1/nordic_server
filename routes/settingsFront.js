const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/settings',(req,res) =>{
  let email_template = fs.readFileSync(path.join(__dirname,'../utils/email.txt'),{ 
    encoding: 'utf8',
    flag: 'r'
   })

  return res.status(200).render('settings/index',{
    email_template: email_template
  })
})


module.exports = router