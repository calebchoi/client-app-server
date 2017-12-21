const createAddressType =
  `CREATE TYPE IF NOT EXISTS address (
    street_address text,
    city text,
    state text,
    zipcode text,
    longitude float,
    latitude float,
  )`;

const createPaymentType =
  `CREATE TYPE IF NOT EXISTS payment (
    card_number bigint,
    card_type text,
    exp_date int,
    cvv int,
  )`;

const createUserTable =
  `CREATE TABLE IF NOT EXISTS user (
    id int PRIMARY KEY,
    firstname text,
    lastname text,
    email text,
    address list<frozen<address>>,
    payment list<frozen<payment>>,
  )`;

const createAddressTable =
  `CREATE TABLE IF NOT EXISTS address (
    id int PRIMARY KEY,
    address list<frozen<address>>,
    payment list<frozen<payment>>,
  )`;

// might not need later
const createPaymentTable =
  `CREATE TABLE IF NOT EXISTS payment (
    id int PRIMARY KEY,
    payment list<frozen<payment>>,
  )`;


module.exports = { createAddressType, createPaymentType, createUserTable, createAddressTable, createPaymentTable };
