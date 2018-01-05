const mysql = require('mysql');
const redis = require('redis');

require('dotenv').config();

const redisClient = redis.createClient({ host: 'ec2-18-221-238-177.us-east-2.compute.amazonaws.com' || 'localhost', port: 6379, db: 1 });
// const queue = kue.createQueue({ redis: { host: 'localhost', port: 6379, db: 2 } });

const client = mysql.createConnection({
  host: 'ec2-18-221-238-177.us-east-2.compute.amazonaws.com' || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'atom',
});

module.exports = { client, redisClient };
