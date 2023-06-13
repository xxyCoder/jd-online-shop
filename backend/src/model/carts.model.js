const { DataTypes } = require('sequelize');
const seq = require('../database/seq.database');
const Users = require('./users.model');
const Goods = require('./goods.model');

const Carts = seq.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "该商品的数量"
    }
}, {
    timestamps: false   // 禁止添加其他列
});

// 定义外键
Carts.belongsTo(Users, { onDelete: 'cascade' });    // 删除用户时级联删除该用户的其购物车所有数据
Carts.belongsTo(Goods, { onDelete: 'cascade' });

// Carts.sync({ force: true });

module.exports = Carts