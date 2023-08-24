const express = require('express')
const router = express.Router()

router.get('/settings',(req,res) =>{
  return res.status(200).render('/settings/index')
})


module.exports = router