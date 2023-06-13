const { DataTypes } = require('sequelize');
const seq = require('../database/seq.database');

const Users = require('./users.model');

const Goods = seq.define('good', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称'
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品数量'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片地址'
    }
}, {
    paranoid: true
});

Goods.belongsTo(Users, { onDelete: 'cascade' });

// Goods.sync({ force: true });

module.exports = Goods