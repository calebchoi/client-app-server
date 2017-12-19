const client = require('../index');
const Promise = require('bluebird');
const faker = require('faker');

// generate 5 million random users
const loops = [];
for (let i = 0; i < 1000000; i += 1) {
  loops.push(i);
}

let counter = 1;

Promise.each(loops, () => {
  const queries = [];

  for (let i = 0; i < 10; i += 1) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.email();
    const address = [{
      street_address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipcode: faker.address.zipCode().substr(0, 5),
      longitude: JSON.parse(((Math.random() * 20) + 30).toFixed(4)),
      latitude: JSON.parse((-1 * ((Math.random() * 50) + 70)).toFixed(4)),
    }];
    const payment = [{
      card_type: 'VISA',
      card_number: 1111222233334444,
      cvv: 111,
      exp_date: 1120,
    }];
    queries.push({
      query: 'INSERT INTO user (id, address, email, firstname, lastname, payment) VALUES (?, ?, ?, ?, ?, ?)',
      params: [counter, address, email, firstname, lastname, payment],
    });
    counter += 1;
  }
  
  return client.batch(queries, { prepare: true })
    .catch((err) => {
      console.log(err);
    });
});
