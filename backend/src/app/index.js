const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// 允许跨域
app.use(cors());

const users = require('../router/users.router');
const goods = require('../router/goods.router');
const carts = require('../router/carts.router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 挂载路由
app.use('/users', users);
app.use('/goods', goods)
app.use('/carts', carts);

module.exports = app;