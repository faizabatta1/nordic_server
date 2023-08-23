const { Vonage } = require('@vonage/server-sdk');
const fs = require('fs')
const path = require('path')

// const vonage = new Vonage({
//   applicationId: "b3cc5981-a376-4298-8921-03cb678a6fcf",
//   // privateKey: fs.readFileSync(path.join(__dirname,'private.key'),{
//   //   encoding:'utf-8'
//   // })

//   privateKey: './private.key'
// });

const vonage = new Vonage({
  applicationId: "b3cc5981-a376-4298-8921-03cb678a6fcf",
  privateKey: path.join(__dirname, 'private.key'), // Load private key from file path
  debug:true
});

function sendAlertSMS(text,to){
  vonage.messages
    .send({
      text: text,
      message_type: "text",
      to: "201150421159",
      from: "4740088605",
      channel: "sms",
    }).then(() => console.log(resp.messageUUID))
    .catch(error => console.error(error.message))
}


module.exports = {
  sendAlertSMS
}