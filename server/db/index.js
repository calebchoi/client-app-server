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

db.User.sync({ force: true })
  .then(db.Address.sync({ force: true }))
  .then(db.Payment.sync({ force: true }))
  .then(db.UserAddress.sync({ force: true }))
  .then(db.UserPayment.sync({ force: true }))
  .catch((err) => {
    throw err;
  });

module.exports = sequelize;
