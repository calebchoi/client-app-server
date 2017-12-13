const db = require('../index');
const Promise = require('bluebird');
const faker = require('faker');

const addressGenerator = () => {
  const streetAddress = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.stateAbbr();
  const zipCode = faker.address.zipCode().substr(0, 5);
  const longitude = ((Math.random() * 20) + 30).toFixed(4);
  const latitude = (-1 * ((Math.random() * 50) + 70)).toFixed(4);

  return { streetAddress, city, state, zipCode, longitude, latitude };
};

//Generate 1 million random addresses
const loops = [];
for (let i = 0; i < 100; i++) {
  loops.push(i);
}

Promise.each(loops, () => {
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
