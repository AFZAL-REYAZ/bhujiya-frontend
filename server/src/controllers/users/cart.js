const express = require('express');
const router = express.Router();
const cartApi = require('../../api/cart/cartApi');
const { auth } = require('../../middlewares/auth');

router.get('/', auth, cartApi.getCart);
router.post('/add', auth, cartApi.addToCart);
router.delete('/remove/:productId', auth, cartApi.removeFromCart);

module.exports = router;
