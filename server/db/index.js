const mysql = require('mysql');
const redis = require('redis');

require('dotenv').config();

const redisClient = redis.createClient({ host: '172.18.0.2' || 'localhost', port: 6379, db: 1 });
// const queue = kue.createQueue({ redis: { host: 'localhost', port: 6379, db: 2 } });

const client = mysql.createConnection({
  host: '172.18.0.3' || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'secret',
  database: process.env.MYSQL_DATABASE || 'atom',
});

module.exports = { client, redisClient };
