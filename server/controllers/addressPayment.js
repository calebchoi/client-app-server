const db = require('../db/index');

async function findAddressPayment(req, res) {
  const query = `SELECT address, payment FROM address WHERE id = ${req.params.userId}`;
  const result = await db.execute(query);
  res.send(result.rows[0]);
}

module.exports = {
  get: (req, res) => {
    findAddressPayment(req, res);
    // db.execute(query)
    //   .then((result) => {
    //     res.send(result.rows[0]);
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
  },
};
