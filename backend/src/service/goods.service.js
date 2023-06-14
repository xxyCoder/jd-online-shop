const Goods = require('../model/goods.model');  // 导入视图，对数据库进行操作

class GoodsService {
    async addGood({ name, price, quantity, image, userId }) {
        await Goods.create({ name, price, quantity, image, userId });
    }
    async getGoodInfo({ name }) {
        const result = await Goods.findOne({
            where: {
                name
            }
        });
        return result ? result.dataValues : null;
    }
    async deleteGd({ name, userId }) {
        const whereOp = {};
        name && Object.assign(whereOp, { name });
        userId && Object.assign(whereOp, { userId });
        await Goods.destroy({
            where: whereOp
        });
    }
    async modifyGood({ name, price, quantity, userId, newName }) {
        const whereOp = {}, updateOp = {};

        newName && Object.assign(updateOp, { name: newName });
        name && Object.assign(whereOp, { name });
        price && Object.assign(updateOp, { price });
        quantity && Object.assign(updateOp, { quantity });
        userId && Object.assign(whereOp, { userId });

        await Goods.update(updateOp, {
            where: whereOp
        });
    }
    async getAllGoods() {
        let data = await Goods.findAll();
        data = [...data];   // 避免空造成操作不一致
        return data.map(d => d.dataValues);
    }
    async getMyGoods(userId) {
        let data = await Goods.findAll({
            where: {
                userId
            }
        });
        data = [...data];
        return data.map(d => d.dataValues);
    }
}

module.exports = new GoodsService();