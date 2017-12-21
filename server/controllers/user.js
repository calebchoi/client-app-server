const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    const q =
      `SELECT * FROM users
      WHERE id = ${req.params.userId}`;
    db.query(q, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
};
