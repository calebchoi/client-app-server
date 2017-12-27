const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    db.redisClient.hget(req.params.userId, 'incentive', (err, reply) => {
      if (!err) {
        if (reply) {
          res.status(200).send(JSON.parse(reply));
        } else {
          res.set('Retry-After', 1);
          res.status(503).send('Retry');
        }
      }
    });
  },
};
