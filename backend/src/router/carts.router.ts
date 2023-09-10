import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { checkGoodIsExists, checkArgsNotNull, checkOpIsValid } from '../middleware/carts.middleware';
import CartController from '../controller/carts.controller';

const router = express.Router();
const { add, deleteGood, getAllGood } = CartController;

// 添加到购物车
router.post('/add', auth, checkArgsNotNull, checkGoodIsExists, add);
// 从购物车中删除
router.post('/delete', auth, checkArgsNotNull, checkGoodIsExists, checkOpIsValid, deleteGood);
// 获取所有购买的商品
router.get('/all', auth, getAllGood);

export default router;