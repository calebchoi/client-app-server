const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
  }, { underscored: true, timestamps: false });

  const Address = sequelize.define('address', {
    street_address: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    state: { type: Sequelize.STRING },
    zipcode: { type: Sequelize.STRING },
    longitude: { type: Sequelize.FLOAT },
    latitude: { type: Sequelize.FLOAT },
  }, { underscored: true, timestamps: false });

  const Payment = sequelize.define('payment', {
    card_number: { type: Sequelize.BIGINT },
    card_type: { type: Sequelize.STRING },
    exp_date: { type: Sequelize.INTEGER },
    cvv: { type: Sequelize.INTEGER },
  }, { underscored: true, timestamps: false });

  const UserAddress = sequelize.define('userAddress', {}, {
    indexes: [{
      fields: ['user_id', 'address_id'],
    }],
    underscored: true,
    timestamps: false,
  });

  const UserPayment = sequelize.define('userPayment', {}, {
    indexes: [{
      fields: ['user_id', 'payment_id'],
    }],
    underscored: true,
    timestamps: false,
  });

  User.belongsToMany(Address, { through: 'userAddress', foreignKey: 'user_id' });
  Address.belongsToMany(User, { through: 'userAddress', foreignKey: 'address_id' });

  User.belongsToMany(Payment, { through: 'userPayment', foreignKey: 'user_id' });
  Payment.belongsToMany(User, { through: 'userPayment', foreignKey: 'payment_id' });

  return {
    User, Address, Payment, UserAddress, UserPayment,
  };
};
