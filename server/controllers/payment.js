const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    db.redisClient.hget(req.params.userId, 'payment', (err, reply) => {
      if (!err) {
        if (reply) {
          res.send(JSON.parse(reply));
        } else {
          const q =
            `SELECT * FROM payments LEFT JOIN userPayments
            ON payments.id = userPayments.payment_id
            WHERE user_id = ${req.params.userId}`;
          db.client.query(q, (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
              db.redisClient.hmset(req.params.userId, 'payment', JSON.stringify(result));
            }
          });
        }
      }
    });
    // db.execute(query)
    //   .then((result) => {
    //     res.send(result);
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
  },
};

