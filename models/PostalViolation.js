const mongoose = require('mongoose');

const postalViolationSchema = new mongoose.Schema({
  violationNumber:{
    type: Number,
    required: true
  },
  pnid:{
    type: String,
    required: true
  },
  reason:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  }
});

const PostalViolation = mongoose.model('PostalViolation', postalViolationSchema);

module.exports = PostalViolation;
