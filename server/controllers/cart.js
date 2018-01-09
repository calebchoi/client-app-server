const queue = require('../db/index').queue;

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

module.exports = {
  post: (req, res) => {
    const params = {
      MessageBody: JSON.stringify(req.body),
      QueueUrl: 'cart',
      DelaySeconds: 0,
      MessageAttributes: {
        '<String>': {
          DataType: 'application/json',
        },
      },
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(data);
      }
    });
  },
};
