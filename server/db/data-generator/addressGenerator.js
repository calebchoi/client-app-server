const db = require('../index').userDB;
const Promise = require('bluebird');
const faker = require('faker');

const states = [
  'AK', 'AL', 'AR', 'AZ', 'CA',
  'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'IA', 'ID', 'IL', 'IN',
  'KS', 'KY', 'LA', 'MA', 'MD',
  'ME', 'MI', 'MN', 'MO', 'MS',
  'MT', 'NC', 'ND', 'NE', 'NH',
  'NJ', 'NM', 'NV', 'NY', 'OH',
  'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VA',
  'VT', 'WA', 'WI', 'WV', 'WY'];

const weight = [
  1, 2, 1, 2, 12,
  2, 1, 1, 6, 3,
  1, 1, 1, 4, 2,
  1, 1, 1, 1, 2,
  2, 3, 2, 2, 1,
  1, 3, 1, 1, 1,
  3, 1, 1, 6, 4,
  1, 1, 4, 1, 2,
  1, 2, 9, 1, 3,
  1, 2, 2, 1, 1,
];

const weightedList = [];

for (let i = 0; i < weight.length; i++) {
  for (let j = 0; j < weight[i]; j++) {
    weightedList.push(states[i]);
  }
}

const addressGenerator = () => {
  const streetAddress = faker.address.streetAddress();
  const city = faker.address.city();
  const state = weightedList[Math.floor(Math.random() * weightedList.length)];
  const zipCode = faker.address.zipCode().substr(0, 5);
  const longitude = ((Math.random() * 20) + 30).toFixed(4);
  const latitude = (-1 * ((Math.random() * 50) + 70)).toFixed(4);

  return { streetAddress, city, state, zipCode, longitude, latitude };
};

// Generate 1 million random addresses
const loops = [];
for (let i = 0; i < 500; i++) {
  loops.push(i);
}

// let counter = 1; 
Promise.each(loops, () => {
  // counter++;
  // const address = addressGenerator();
  // return elastic.addDocument([address.streetAddress, address.city, address.state, address.zipCode, address.longitude, address.latitude])
  //   .then(() => {
  //     console.log('inserting into elastic', counter);
  //   });
  const addresses = [];

  for (let i = 0; i < 10000; i++) {
    const address = addressGenerator();
    addresses.push({
      street_address: address.streetAddress,
      city: address.city,
      state: address.state,
      zipcode: address.zipCode,
      longitude: address.longitude,
      latitude: address.latitude,
    });
  }

  return db.Address.bulkCreate(addresses)
    .catch((err) => {
      throw err;
    });
});
