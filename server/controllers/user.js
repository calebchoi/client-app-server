const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    db.redisClient.hget(req.params.userId, 'user', (err, reply) => {
      if (!err) {
        if (reply) {
          res.send(JSON.parse(reply));
        } else {
          const q =
            `SELECT * FROM users
            WHERE id = ${req.params.userId}`;
          db.client.query(q, (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result[0]);
              db.redisClient.hmset(req.params.userId, 'user', JSON.stringify(result[0]));
            }
          });
        }
      }
    });
  },
};
