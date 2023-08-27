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

      return res.status(200).send(totalViolations)      
    }else{
      return res.status(200).send(0)
    }
  }catch(error){
    return res.status(500).send(error.message)
  }
})

module.exports = router