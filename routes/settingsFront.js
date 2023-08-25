const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/settings',(req,res) =>{
  let data = fs.readFileSync(path.join(__dirname,'../utils/email.txt'),{ 
    encoding: 'utf8',
    flag: 'r'
   })

   let json = JSON.parse(data)


  return res.status(200).render('settings/index',{
    email_template: json.text,
    email_subject: json.subject

  })
})


module.exports = router