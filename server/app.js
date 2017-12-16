require('dotenv').config();
const apm = require('elastic-apm-node').start();
const express = require('express');
const db = require('./db/index.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(200);
});

app.get('/user/:userId', (req, res) => {
  db.userDB.User.find({ where: { id: req.params.userId } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return err;
    });
});

app.get('/user/:userId/address', (req, res) => {
  db.userDB.UserAddress.find({ where: { user_id: req.params.userId } })
    .then((result) => {
      db.userDB.Address.find({ where: { id: result.address_id } })
        .then((result) => {
          res.send(result);
        });
    });
});
// app.post('/user/:userId/order', (req, res) => {

// });
app.use(apm.middleware.express());

module.exports = app;
