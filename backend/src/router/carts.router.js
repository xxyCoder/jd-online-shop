const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { checkGoodIsExists, checkArgsNotNull, checkOpIsValid } = require('../middleware/carts.middleware');
const { add, deleteGood } = require('../controller/carts.controller');

const router = express.Router();

router.post('/add', auth, checkArgsNotNull, checkGoodIsExists, add);
router.post('/delete', auth, checkArgsNotNull, checkGoodIsExists, checkOpIsValid, deleteGood);

module.exports = router;