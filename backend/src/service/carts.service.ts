/* eslint-disable @typescript-eslint/no-non-null-assertion */
import seq from '../database/seq.database';
import Cart, { type CartModel } from '../model/carts.model';  // 导入视图，对数据库进行操作
import GoodService from './goods.service';
import { type GoodModel } from '../model/goods.model'

const { modifyGood } = GoodService;

class CartsService {
    async addToCart({ userId, good, quantity, name }: { userId: number, good: GoodModel, quantity: number, name: string }) {
        // 开启事务
        const t = await seq.transaction();
        try {
            // 先判断购物车中是否存在该商品
            const data = await Cart.findOne({
                where: { goodId: good.id, userId }
            });
            const dv = data?.dataValues as CartModel;
            // 真正能够添加的值
            let count = Math.min(good.quantity!, quantity);
            if (!dv) { // 不存在商品则新建
                Cart.create({ userId, goodId: good.id!, quantity: count });
            } else {    // 存在则新增
                await Cart.update({ quantity: dv.quantity! + count }, {
                    where: {
                        userId,
                        goodId: good.id
                    }
                });
            }
            // 商品放入了购物车，那么商品现存数量应该减少，增加的即为减少的，取反即可
            count = good.quantity! - count;
            await modifyGood({ name, quantity: count, goodId: good.id });
            // 都成功就提交事务
            t.commit();
        } catch (e) {
            console.error(e);
            // 有失败就回滚
            t.rollback();
        }
    }
    async deleteFromCart({ userId, good, quantity, cart }: { userId: number, good: GoodModel, quantity: number, cart: CartModel }) {
        const t = await seq.transaction();
        try {
            let count = Math.min(quantity, cart.quantity!);
            await Cart.update({ quantity: cart.quantity! - count }, {
                where: {
                    userId,
                    goodId: good.id
                }
            });
            count = good.quantity! + count;
            console.log(count);
            await modifyGood({ goodId: good.id, quantity: count, name: good.name });
            t.commit();
        } catch (e) {
            console.error(e);
            t.rollback();
        }
    }
    async getCartInfo({ goodId, userId }: { goodId: number; userId: number }) {
        const data = await Cart.findOne({
            where: {
                goodId,
                userId
            }
        });
        return data ? data.dataValues : null;
    }
    async getAll(userId: number) {
        let data = await Cart.findAll({
            where: {
                userId
            }
        });
        data = [...data];
        return data.map(d => d.dataValues);
    }
}

export default new CartsService();