const cassandra = require('cassandra-driver');
const db = require('./config');

require('dotenv').config();

const client = new cassandra.Client({ contactPoints: [process.env.DB_HOST || 'localhost'], keyspace: process.env.DB_NAME || 'atom' });

client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Cassandra Connected!');
  }
});

client.execute(db.createAddressType)
  .then(() => client.execute(db.createPaymentType))
  .then(() => client.execute(db.createUserTable))
  .catch((err) => {
    console.log(err);
  });

module.exports = client;
