const db = require('../index').userDB;
const Promise = require('bluebird');
const faker = require('faker');

const emails = ['gmail.com', 'yahoo.com', 'hotmail.com',
  'comcast.net', 'email.com', 'aol.com',
  'eric.com', 'john.com', 'aman.com',
  'outlook.com', 'inbox.com', 'mail.com'];

const userGenerator = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}.${lastName}${Math.floor(Math.random() * 100000)}@${emails[Math.floor(Math.random() * 12)]}`;

  return { firstName, lastName, email };
};

// generate 1 million random users
const loops = [];
for (let i = 0; i < 20; i++) {
  loops.push(i);
}

Promise.each(loops, () => {
  const users = [];

  for (let i = 0; i < 50000; i++) {
    const user = userGenerator();
    users.push({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    });
  }

  return db.User.bulkCreate(users)
    .catch((err) => {
      throw err;
    });
});
