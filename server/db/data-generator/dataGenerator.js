const client = require('../index');
const Promise = require('bluebird');
const faker = require('faker');

// generate 5 million random users
const loops = [];
for (let i = 0; i < 999996; i += 1) {
  loops.push(i);
}

let counter = 41;

Promise.each(loops, () => {
  const queries = [];

  for (let i = 0; i < 10; i += 1) {
    const payment = [{
      card_type: 'VISA',
      card_number: 1111222233334444,
      cvv: 111,
      exp_date: 1120,
    }];
    queries.push({
      query: 'INSERT INTO address (id, payment) VALUES (?, ?)',
      params: [counter, payment],
    });
    counter += 1;
  }
  
  return client.batch(queries, { prepare: true })
    .catch((err) => {
      console.log(err);
    });
});
