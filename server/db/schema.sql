CREATE DATABASE IF NOT EXISTS atom;

USE atom;

CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  Username varchar(255),

  PRIMARY KEY(ID),
  UNIQUE (Username)

);

-- CREATE TABLE rooms (
--   ID int NOT NULL AUTO_INCREMENT,
--   Roomname varchar(255),

--   PRIMARY KEY(ID),
--   UNIQUE (Roomname)

-- );


CREATE TABLE messages (
  /* Describe your table here.*/
  ID int NOT NULL AUTO_INCREMENT,
  UserID int, 
  Roomname varchar(255), 
  Message varchar(255),

  PRIMARY KEY (ID),
  FOREIGN KEY (UserID) REFERENCES users(ID)
  
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables.*/

