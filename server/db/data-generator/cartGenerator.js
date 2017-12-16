const client = require('../index').inventoryCartDB;
const Promise = require('bluebird');
const elastic = require('../../../elasticsearch/index.js');

const itemCount = [1, 2, 3, 4, 5, 6, 7, 8];
const weight = [0.35, 0.3, 0.15, 0.10, 0.03, 0.03, 0.02, 0.02];
const weightedList = [];

for (let i = 0; i < weight.length; i++) {
  for (let j = 0; j < weight[i] * 100; j++) {
    weightedList.push(itemCount[i]);
  }
}

setTimeout(() => {
  const cartGenerator = () => {
    const numOfItems = weightedList[Math.floor(Math.random() * 100)];
    const items = [];
    for (let i = 0; i < numOfItems; i++) {
      items.push(i);
    }

    let totalPrice = 0;

    return Promise.each(items, (i) => {
      const productId = Math.floor(Math.random() * 100000);
      items[i] = {
        p_id: productId,
        quantity: 1,
      };

      const query = 'SELECT price from inventory WHERE id = ?';
      return client.execute(query, [productId], { prepare: true })
        .then(result => {
          if (result.rows[0]) {
            totalPrice += result.rows[0].price;
          }
        });
    }).then(() => {
      return { items, totalPrice };
    });
  };

  const loops = [];
  for (let i = 0; i < 1000000; i += 4) {
    loops.push(Math.floor(Math.random() * 4) + i);
  }

  Promise.each(loops, (userID) => {
    return cartGenerator()
      .then((cart) => {
        const totalPrice = JSON.parse(cart.totalPrice.toFixed(2));
        // return elastic.addDocument([userID, cart.items, totalPrice, cart.items.length])
        //   .then((result) => {
        //     console.log(result);
        //   })
        //   .catch((err) => {
        //     throw err;
        //   });
        const query = 'INSERT INTO cart (user_id, item, total_price) values (?, ?, ?)';
        return client.execute(query, [userID, cart.items, totalPrice], { prepare: true });
      });
  });
}, 1000);
