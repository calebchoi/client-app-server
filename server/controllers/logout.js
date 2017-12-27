const db = require('../db/index');

module.exports = {
  post: (req, res) => {
    res.status(202).end();
    db.redisClient.del(req.params.userId);
  },
};
