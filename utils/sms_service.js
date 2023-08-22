const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  applicationId: "b3cc5981-a376-4298-8921-03cb678a6fcf",
  privateKey: './private.key'
});

async function sendAlertSMS(text,to){
  try{
    await vonage.messages
    .send({
      text: text,
      message_type: "text",
      to: to,
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