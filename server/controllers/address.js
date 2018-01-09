const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    db.redisClient.hget(req.params.userId, 'address', (err, reply) => {
      if (!err) {
        if (reply) {
          res.send(JSON.parse(reply));
        } else {
          const q =
            `SELECT * FROM addresses LEFT JOIN userAddresses
            ON addresses.id = userAddresses.address_id
            WHERE user_id = ${req.params.userId}`;
          db.client.query(q, (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
              db.redisClient.hmset(req.params.userId, 'address', JSON.stringify(result));
            }
          });
        }
      }
    });
  },
};
