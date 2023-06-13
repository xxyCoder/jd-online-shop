const express = require('express');
const { checkTwicePasswordIsSame, checkArgsIsNotNull, checkUserIsExists, crpytPassword, verifyLogin, checkArgBothIfNull, } = require('../middleware/users.middleware');
const { registry, login, modify, logout } = require('../controller/users.controller');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

// 注册
router.post('/registry', checkArgsIsNotNull, checkTwicePasswordIsSame, checkUserIsExists, crpytPassword, registry);
// 登录
router.post('/login', checkArgsIsNotNull, verifyLogin, login);
// 修改
router.post('/changeInfo', auth, checkArgBothIfNull, checkUserIsExists, crpytPassword, modify);
// 注销
router.post('/logout', auth, logout);

module.exports = router;