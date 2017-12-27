const router = require('express').Router();
const address = require('../controllers/address');
const payment = require('../controllers/payment');
const user = require('../controllers/user');
const cart = require('../controllers/cart');
const shippingAddress = require('../controllers/shippingAddress');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const order = require('../controllers/order');
const incentive = require('../controllers/incentive');

router.get('/', (req, res) => {
  res.status(200).send('hello');
});

// login route
router.post('/user/:userId/login', login.post);

// logout route
router.post('/user/:userId/logout', logout.post);

// user route
router.get('/user/:userId', user.get);

// address route
router.get('/user/:userId/address', address.get);

// payment route
router.get('/user/:userId/payment', payment.get);

// user update cart route
router.post('/user/:userId/cart', cart.post);

// user shipping route
router.post('/user/:userId/shippingAddress', shippingAddress.post);

// user submit order
router.post('/user/:userId/order', order.post);

// user incentive route
router.get('/user/:userId/incentive', incentive.get);

module.exports = router;
