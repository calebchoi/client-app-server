// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'REGION' });

// Create an SQS service object
const sqs = new AWS.SQS();

const queueURL = 'SQS_QUEUE_URL';

const params = {
  AttributeNames: [
    'SentTimestamp',
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    'All',
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.log('Receive Error', err);
  } else if (data.Messages) {
    // store data in queue

    const deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, (err, data) => {
      if (err) {
        console.log('Delete Error', err);
      } else {
        console.log('Message Deleted', data);
      }
    });
  }
});