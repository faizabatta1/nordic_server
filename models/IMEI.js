const mongoose = require('mongoose');

const IMEISchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    unique:true
    // validate: {
    //   validator: function (value) {
    //     // Use a regular expression to validate the IMEI format (15 digits)
    //     const imeiRegex = /^\d{15}$/;
    //     return imeiRegex.test(value);
    //   },
    //   message: 'Invalid IMEI format. IMEI must be a 15-digit number.',
    // },
  },
  zone:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone'
  }
});

const IMEI = mongoose.model('IMEI', IMEISchema);

module.exports = IMEI;
