import { DataTypes, Model, ForeignKey, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'; // 导入数据类型
import seq from '../database/seq.database';
import Users from './users.model';

export type GoodModel = Partial<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    userId: number;
}>;

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

export default Goods;