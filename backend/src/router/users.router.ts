import express from 'express'
import { checkTwicePasswordIsSame, checkArgsIsNotNull, checkUserIsExists, crpytPassword, verifyLogin, checkArgBothIfNull, } from '../middleware/users.middleware';
import UserController from '../controller/users.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();
const { registry, login, modify, logout } = UserController;

// 注册
router.post('/registry', checkArgsIsNotNull, checkTwicePasswordIsSame, checkUserIsExists, crpytPassword, registry);
// 登录
router.post('/login', checkArgsIsNotNull, verifyLogin, login);
// 修改
router.post('/changeInfo', auth, checkArgBothIfNull, checkUserIsExists, crpytPassword, modify);
// 注销
router.post('/logout', auth, logout);

export default router;