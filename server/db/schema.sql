CREATE DATABASE IF NOT EXISTS atom;

USE atom;

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(255),
  last_name varchar(255),
  email varchar(255),

  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS addresses (
  id int NOT NULL AUTO_INCREMENT,
  street_address varchar(255),
  city varchar(255),
  state varchar(255),
  zipcode varchar(255),
  longitude float,
  latitude float,

  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id int NOT NULL AUTO_INCREMENT,
  card_number bigint,
  card_type varchar(255),
  exp_date int,
  cvv int,

  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS userAddresses (
  user_id int NOT NULL,
  address_id int NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS userPayments (
  user_id int NOT NULL,
  payment_id int NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (payment_id) REFERENCES payments(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables.*/

