const { Vonage } = require('@vonage/server-sdk');
const fs = require('fs')

const vonage = new Vonage({
  applicationId: "b3cc5981-a376-4298-8921-03cb678a6fcf",
  privateKey: fs.readFileSync('private.key','utf-8')
});

async function sendAlertSMS(text,to){
  try{
    await vonage.messages
    .send({
      text: text,
      message_type: "text",
      to: "4740088605",
      from: "4740088605",
      channel: "sms",
    })
    
    console.log(resp.messageUUID)
  }catch(error){
    console.error(error.message)
  }
}


module.exports = {
  sendAlertSMS
}