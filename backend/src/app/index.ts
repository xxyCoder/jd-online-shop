import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import users from '../router/users.router'
import goods from '../router/goods.router'
import carts from '../router/carts.router'
const app = express();

// 将 public 目录作为静态目录
app.use(express.static('public'))

// 允许跨域
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 挂载路由
app.use('/users', users);
app.use('/goods', goods)
app.use('/carts', carts);

export default app;