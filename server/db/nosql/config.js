const createItemType =
  `CREATE TYPE IF NOT EXISTS item (
    p_id int,
    quantity int
  )`;

const createCartTable =
  `CREATE TABLE IF NOT EXISTS cart (
    user_id int PRIMARY KEY,
    item frozen<item>,
    total_price double
  )`;

const createInventoryTable =
  `CREATE TABLE IF NOT EXISTS inventory (
      id int PRIMARY KEY,
      price double,
      quantity int
  )`;

module.exports = { createItemType, createCartTable, createInventoryTable };
