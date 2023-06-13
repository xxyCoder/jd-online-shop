const seq = require('../database/seq.database');
const Carts = require('../model/carts.model');  // 导入视图，对数据库进行操作
const { modifyGood } = require('./goods.service');

class CartsService {
    async addToCart({ userId, good, quantity, name }) {
        // 开启事务
        const t = await seq.transaction();
        try {
            // 先判断购物车中是否存在该商品
            const data = await Carts.findOne({ goodId: good.id, userId });
            // 真正能够添加的值
            let count = Math.min(good.quantity, quantity);
            if (!data) { // 不存在商品则新建
                Carts.create({ userId, goodId: good.id, quantity: count });
            } else {    // 存在则新增
                await Carts.update({ quantity: data.quantity + count }, {
                    where: {
                        userId,
                        goodId: good.id
                    }
                });
            }
            // 商品放入了购物车，那么商品现存数量应该减少，增加的即为减少的，取反即可
            count = good.quantity - count;
            await modifyGood({ name, quantity: count, userId });
            // 都成功就提交事务
            t.commit();
        } catch (e) {
            console.log(e);
            // 有失败就回滚
            t.rollback();
            throw e;
        }
    }
    async deleteFromCart({ userId, good, quantity, cart }) {
        const t = await seq.transaction();
        try {
            let count = Math.min(quantity, cart.quantity);
            await Carts.update({ quantity: cart.quantity - count }, {
                where: {
                    userId,
                    goodId: good.id
                }
            });
            count = good.quantity + count;
            await modifyGood({ goodId: good.id, quantity: count, name: good.name });
            t.commit();
        } catch (e) {
            console.log(e);
            t.rollback();
            throw e;
        }
    }
    async getCartInfo({ goodId, userId }) {
        const data = await Carts.findOne({
            where: {
                goodId,
                userId
            }
        });
        return data ? data.dataValues : null;
    }
}

module.exports = new CartsService();