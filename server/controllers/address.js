const db = require('../db/index');

// async function findAddressPayment(req, res) {
//   const query = `SELECT * FROM address WHERE id = ${req.params.userId}`;
//   const result = await db.execute(query);
//   res.send(result.rows[0]);
// }

module.exports = {
  get: (req, res) => {
    // findAddressPayment(req, res);
    const q =
      `SELECT * FROM addresses LEFT JOIN userAddresses
      ON addresses.id = userAddresses.address_id
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
