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
    }else if(id == 1){
      let currentDate = new Date().toISOString().split('T')[0]

      let violations = await Violation.find({
        createdAt: currentDate
      })
      let totalViolations = 0;
    
      violations.forEach(violation => {
        totalViolations += violation.violations;
      });

      return res.send(totalViolations.toString())      
    }else if(id == 2){
      const now = new Date();
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(now.getDate() - 3);

      try {
        const result = await Violation.aggregate([
          {
            $match: {
              createdAt: {
                $gte: threeDaysAgo.toISOString(), // Filter for documents created after three days ago
                $lt: now.toISOString() // Filter for documents created until now
              }
            }
          },
          {
            $group: {
              _id: null,
              totalViolations: { $sum: '$violations' } // Sum the violations field
            }
          }
        ]);

        const totalViolations = result.length > 0 ? result[0].totalViolations : 0;
        console.log('Total violations in the last 3 days:', totalViolations);
      } catch (err) {
        console.error('Error:', err);
      }
    }else{
      return res.send("0")
    }
  }catch(error){
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

module.exports = router