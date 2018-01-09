require('dotenv').config();
require('newrelic');

const bodyParser = require('body-parser');
const cluster = require('cluster');
const express = require('express');
const router = require('./routes');
const cpuCount = require('os').cpus().length;

if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log('Worker %d died :(', worker.id);
    cluster.fork();
  });
} else {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/', router);

  const PORT = process.env.PORT || 8000;

  app.listen(PORT);
  console.log('Worker %d running!', cluster.worker.id);
}
