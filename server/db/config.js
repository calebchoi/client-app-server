const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: true },
  }, { underscored: true, timestamps: false });

  const Address = sequelize.define('address', {
    street_number: { type: Sequelize.INTEGER },
    street_address: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    state: { type: Sequelize.STRING },
    zipcode: { type: Sequelize.INTEGER },
    longitude: { type: Sequelize.DECIMAL },
    latitude: { type: Sequelize.DECIMAL },
  }, { underscored: true, timestamps: false });

  const Payment = sequelize.define('payment', {
    name_on_card: { type: Sequelize.STRING },
    card_number: { type: Sequelize.INTEGER, unique: true },
    card_type: { type: Sequelize.STRING },
    exp_date: { type: Sequelize.INTEGER },
    cvv: { type: Sequelize.INTEGER },
  }, { underscored: true, timestamps: false });

  const UserAddress = sequelize.define('userAddress', {}, { underscored: true, timestamps: false });

  const UserPayment = sequelize.define('userPayment', {}, { underscored: true, timestamps: false });

  User.belongsToMany(Address, { through: 'userAddress', foreignKey: 'user_id' });
  Address.belongsToMany(User, { through: 'userAddress', foreignKey: 'address_id' });

  User.belongsToMany(Payment, { through: 'userPayment', foreignKey: 'user_id' });
  Payment.belongsToMany(User, { through: 'userPayment', foreignKey: 'payment_id' });

  return {
    User, Address, Payment, UserAddress, UserPayment,
  };
};
