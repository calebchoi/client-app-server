const express = require('express');
const db = require('./db/index.js');

const app = express();

app.get('/', (req, res) => {
  db.userDB.User.find({ where: { id: 100 } })
    .then((result) => {
      res.send(result);
    });
});

module.exports = app;
