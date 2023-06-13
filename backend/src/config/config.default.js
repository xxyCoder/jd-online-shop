// 默认配置
const dotenv = require('dotenv');   // dotenv 从.env文件读取变量，并注入到nodejs中的process.env对象
dotenv.config();    // 读取以.env结尾的配置文件

module.exports = process.env;