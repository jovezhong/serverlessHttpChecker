const https = require('https');
const AWS   = require('aws-sdk');

exports.handler = (event, context, callback) => {
    const req = https.get('https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=1&locationId=5026&minimum=1', (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            body = JSON.parse(body);
            let slot=body[0].startTimestamp;
            if(slot.startsWith('2020')){
                var params = {
                    Message: "Found a slot in 2020: "+slot,
                    TopicArn: process.env.SNS_ARN
                    };
                new AWS.SNS().publish(params,function(err, data) {
                  if (err) callback(err);
                  else     callback(null, slot);
                });
            }
        });
    });
    req.on('error', callback);
};
