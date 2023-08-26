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
  apiKey: "d1840a73",
  apiSecret: "c2eOlaZYWqqO6DyT",
  applicationId: "b3cc5981-a376-4298-8921-03cb678a6fcf",
  // privateKey:"./private.key",
  privateKey: Buffer.from(process.env.VONAGE_APPLICATION_PRIVATE_KEY64, 'base64').toString(),
});

async function sendAlertSMS(text,to){ 

  const resp = await vonage.sms.send({
    to: '201150421159',
    from: '4740088605',
    text: 'pn167 har oppdaterer kjøretøyets EC876765, tjenestenr er: EL 03  kjørelengde 2000 og dette er den planlagte servicedatoen.',
  });
}


module.exports = {
  sendAlertSMS
}