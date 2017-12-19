const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    const query = `SELECT address FROM user WHERE id = ${req.params.userId}`;
    db.execute(query)
      .then((result) => {
        res.send(result.rows[0].address);
      })
      .catch((err) => {
        return err;
      });
  },
};
