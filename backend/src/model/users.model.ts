import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'; // 导入数据类型
import seq from '../database/seq.database';

export type UserModel = Partial<{
    id: number;
    username: string;
    password: string;
}>;

const Users = seq.define('user',{
    // id会被sequlize自动创建
    username: {
        type: DataTypes.STRING,
        allowNull: false,    // 字段not null
        unique: true,   // 唯一
        comment: '用户名'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    }
},{
    timestamps: false   // 禁止添加其他列
});

export default Users;