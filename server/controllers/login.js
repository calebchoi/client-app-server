const db = require('../db/index');

module.exports = {
  post: (req, res) => {
    res.status(200).end();
    db.redisClient.hget(req.params.userId, 'user', (err, reply) => {
      if (!err) {
        if (!reply) {
          const q =
            `SELECT * FROM users
            WHERE id = ${req.params.userId}`;
          db.client.query(q, (err, result) => {
            if (!err) {
              db.redisClient.hmset(req.params.userId, 'user', JSON.stringify(result[0]));
            }
          });
        }
      }
    });

    db.redisClient.hget(req.params.userId, 'address', (err, reply) => {
      if (!err) {
        if (!reply) {
          const q =
            `SELECT * FROM addresses LEFT JOIN userAddresses
            ON addresses.id = userAddresses.address_id
            WHERE user_id = ${req.params.userId}`;
          db.client.query(q, (err, result) => {
            if (!err) {
              db.redisClient.hmset(req.params.userId, 'address', JSON.stringify(result));
            }
          });
        }
      }
    });

    db.redisClient.hget(req.params.userId, 'payment', (err, reply) => {
      if (!err) {
        if (!reply) {
          const q =
            `SELECT * FROM payments LEFT JOIN userPayments
            ON payments.id = userPayments.payment_id
            WHERE user_id = ${req.params.userId}`;
          db.client.query(q, (err, result) => {
            if (!err) {
              db.redisClient.hmset(req.params.userId, 'payment', JSON.stringify(result));
            }
          });
        }
      }
    });
  },
};
