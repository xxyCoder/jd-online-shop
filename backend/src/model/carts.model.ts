import { DataTypes, Model, ForeignKey, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'; // 导入数据类型
import seq from '../database/seq.database';
import Users from './users.model';
import Goods from './goods.model';

export type CartModel = Partial<{
    id: number;
    quantity: number;
    goodId: number;
    userId: number;
}>;


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

// Cart.sync({ force: true });

export default Carts