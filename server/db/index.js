const mysql = require('mysql');
const redis = require('redis');
const kue = require('kue');

require('dotenv').config();

const redisClient = redis.createClient({ host: 'localhost', port: 6379, db: 1 });
const queue = kue.createQueue({ redis: { host: 'localhost', port: 6379, db: 2 } });

const client = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'atom',
});

module.exports = { client, redisClient, queue };
