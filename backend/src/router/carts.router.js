const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { checkGoodIsExists, checkArgsNotNull, checkOpIsValid } = require('../middleware/carts.middleware');
const { add, deleteGood, getAllGood } = require('../controller/carts.controller');

const router = express.Router();

// 添加到购物车
router.post('/add', auth, checkArgsNotNull, checkGoodIsExists, add);
// 从购物车中删除
router.post('/delete', auth, checkArgsNotNull, checkGoodIsExists, checkOpIsValid, deleteGood);
// 获取所有购买的商品
router.get('/all', auth, getAllGood);

module.exports = router;