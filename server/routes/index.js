const router = require('express').Router();
const address = require('../controllers/address');
const payment = require('../controllers/payment');
const user = require('../controllers/user');
const cart = require('../controllers/cart');
const shippingAddress = require('../controllers/shippingAddress');
const login = require('../controllers/login');
const logout = require('../controllers/logout');

router.get('/', (req, res) => {
  res.status(200).end();
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

router.post('/user/:userId/submitOrder');

module.exports = router;
