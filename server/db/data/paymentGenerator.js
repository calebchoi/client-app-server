const db = require('../index');
const Promise = require('bluebird');
const generator = require('creditcard-generator');

const ccType = ['VISA', 'MasterCard', 'Amex', 'Diners', 'Discover', 'EnRoute', 'JCB', 'Voyager'];

const paymentGenerator = () => {
  const cardType = ccType[Math.floor(Math.random() * 8)];
  const cardNum = generator.GenCC(cardType);
  const cvv = 111;
  const exp = 1120;
  return { cardType, cardNum, cvv, exp };
};

const loops = [];
for (let i = 0; i < 100; i++) {
  loops.push(i);
}

Promise.each(loops, () => {
  const payment = [];

  for (let i = 0; i < 10000; i++) {
    const card = paymentGenerator();
    payment.push({
      card_number: card.cardNum,
      card_type: card.cardType,
      exp_date: card.exp,
      cvv: card.cvv,
    });
  }

  return db.Payment.bulkCreate(payment)
    .catch((err) => {
      throw err;
    });
});
