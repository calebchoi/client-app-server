const db = require('../db/index');

module.exports = {
  get: (req, res) => {
    const q =
      `SELECT * FROM payments LEFT JOIN userPayments
      ON payments.id = userPayments.payment_id
      WHERE user_id = ${req.params.userId}`;
    db.query(q, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
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
