const db = require('../db/index');

const env = process.env.NODE_ENV;

let AWS;

// if the environment is a local one, require mocks
if (!env || env === 'development') {
  AWS = require('aws-mocks');
// otherwise, require the real SDK
} else {
  AWS = require('aws-sdk');
}

const sqs = new AWS.SQS();

// async function sendToQueue(req, res) {
//   const params = {
//     MessageBody: JSON.stringify(req.body), /* required */
//     QueueUrl: 'queue', /* required */
//     DelaySeconds: 0,
//     MessageAttributes: {
//       '<String>': {
//         DataType: 'application/json',
//       },
//     },
//   };

//   const result = await sqs.sendMessage(params);
//   res.status(200).send(result);
// }

module.exports = {
  post: (req, res) => {
    // sendToQueue(req, res);
    const params = {
      MessageBody: JSON.stringify(req.body), /* required */
      QueueUrl: 'order', /* required */
      DelaySeconds: 0,
      MessageAttributes: {
        '<String>': {
          DataType: 'application/json',
        },
      },
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(202).send(data);
        db.redisClient.hdel(req.params.userId, 'incentive');
      }
    });
  },
};
