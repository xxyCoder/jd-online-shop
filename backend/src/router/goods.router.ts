import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.middleware';
import { saveImage, checkArgsIsValid, checkNameIsNotNull, checkOpIsValid, checkArgAllIsNull, chechNewNameIsExists } from '../middleware/goods.middleware';
import GoodController from '../controller/goods.controller';

const router = express.Router();
// // 配置 multer 中间件，设置文件或图谱上传地址
const upload = multer({ dest: 'public/' })
const { add, deleteGood, modify, getAllWithLimits, getMy, getAllGoodsCount } = GoodController;

// 添加新商品，使用两遍是因为第一次auth验证，之后被覆盖掉，需要重新验证获取userId
router.post('/addGood', auth, upload.single("image"), auth, saveImage, checkArgsIsValid, add);
// 下架商品
router.post('/deleteGood', auth, checkNameIsNotNull, checkOpIsValid, deleteGood);
// 修改商品信息
router.post('/modifyGood', auth, checkArgAllIsNull, checkOpIsValid, chechNewNameIsExists, modify);
// 分页查询全部商品
router.get('/getAllGoods', getAllWithLimits);
// 获取自己上传的商品
router.get('/myGoods', auth, getMy)
// 获取全部商品的数量
router.get('/getAllGoodsCount', getAllGoodsCount)

export default router;