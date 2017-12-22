const db = require('../db/index');

module.exports = {
  post: (req, res) => {
    res.status(200).end();
    db.redisClient.del(req.params.userId);
  },
};
