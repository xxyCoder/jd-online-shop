const express = require('express');
const multer = require('multer');
const { auth } = require('../middleware/auth.middleware');
const { saveImage, checkArgsIsValid, checkNameIsNotNull, checkOpIsValid, checkArgAllIsNull, chechNewNameIsExists } = require('../middleware/goods.middleware');
const { add, deleteGood, modify, getAll, getMy } = require('../controller/goods.controller');

const router = express.Router();
// 配置 multer 中间件，设置文件或图谱上传地址
const upload = multer({ dest: 'public/' })

// 添加新商品，使用两遍是因为第一次auth验证，之后被覆盖掉，需要重新验证获取userId
router.post('/addGood', auth, upload.single("image"), auth, saveImage, checkArgsIsValid, add);
// 下架商品
router.post('/deleteGood', auth, checkNameIsNotNull, checkOpIsValid, deleteGood);
// 修改商品信息
router.post('/modifyGood', auth, checkArgAllIsNull, checkOpIsValid, chechNewNameIsExists, modify);
// 获取所有商品
router.get('/getAllGoods', getAll);
// 获取自己上传的商品
router.get('/myGoods', auth, getMy)

module.exports = router;