const router = require('express').Router();
const addressPayment = require('../controllers/addressPayment');
const user = require('../controllers/user');

router.get('/user/:userId', user.get);

// address route
router.get('/user/:userId/addressPayment', addressPayment.get);

// user update cart route
router.post('/user/:userId/cart');

// user shipping route
router.post('/user/:userId/shipping');

router.post('/user/:userId/submitOrder');

module.exports = router;
