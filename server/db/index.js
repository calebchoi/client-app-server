const Sequelize = require('sequelize');
const config = require('./config');

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'atom',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  });

const db = config(sequelize);

const dropDB = () => {
  return sequelize.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
};

const createDB = () => {
  return sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
};

const useDB = () => sequelize.query(`USE ${process.env.DB_NAME}`);

db.User.sync()
  .then(db.Address.sync())
  .then(db.Payment.sync())
  .then(db.UserAddress.sync())
  .then(db.UserPayment.sync())
  .catch((err) => {
    throw err;
  });

module.exports = {
  sequelize,
  User: db.User,
  Address: db.Address,
  Payment: db.Payment,
  UserAddress: db.UserAddress,
  UserPayment: db.UserPayment,
};
