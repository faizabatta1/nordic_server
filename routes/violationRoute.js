const express = require('express')
const router = express.Router()
const Violation = require('../models/Violation')

router.get('/violations/:id',async (req,res) =>{
  try{
    let { id } = req.params

    if(id == 0){
      let violations = await Violation.find({})
      let totalViolations = 0;
    
      violations.forEach(violation => {
        totalViolations += violation.violations;
      });

      return res.send(totalViolations.toString())      
    }else{
      return res.send("0")
    }
  }catch(error){
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

module.exports = router