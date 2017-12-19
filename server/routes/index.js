const router = require('express').Router();
const address = require('../controllers/address');
const user = require('../controllers/user');
const payment = require('../controllers/payment');

// user route
router.get('/user/:userId', user.get);

// payment route
router.get('/user/:userId/payment', payment.get);

// address route
router.get('/user/:userId/address', address.get);

// user update cart route
router.post('/user/:userId/cart')

// user checkout route
router.post('/user/:userId/checkout')

module.exports = router;
