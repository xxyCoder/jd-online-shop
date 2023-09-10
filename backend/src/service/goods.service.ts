import Goods, { type GoodModel } from '../model/goods.model';  // 导入视图，对数据库进行操作

class GoodsService {
    async addGood({ name, price, quantity, image, userId }: { userId: number, name: string, price: number, quantity: number, image: string }) {
        await Goods.create({ name, price, quantity, image, userId });
    }
    async getGoodInfo({ name, id }: GoodModel) {
        const whereOp = {};
        name && Object.assign(whereOp, { name });
        id && Object.assign(whereOp, { id });
        const result = await Goods.findOne({
            where: whereOp
        });
        return result ? result.dataValues : null;
    }
    async deleteGd({ name, userId }: { name: string, userId: number }) {
        const whereOp = {};
        name && Object.assign(whereOp, { name });
        userId && Object.assign(whereOp, { userId });
        await Goods.destroy({
            where: whereOp
        });
    }
    async modifyGood({ name, price, quantity, userId, newName, goodId }: { name?: string, price?: number, quantity?: number, userId?: number; newName?: string, goodId?: number }) {
        const whereOp = {}, updateOp = {};

        newName && Object.assign(updateOp, { name: newName });
        name && Object.assign(whereOp, { name });
        goodId && Object.assign(whereOp, { goodId })
        price && Object.assign(updateOp, { price });
        quantity && Object.assign(updateOp, { quantity });
        userId && Object.assign(whereOp, { userId });

        await Goods.update(updateOp, {
            where: whereOp
        });
    }
    async getAllGoods({ count, offset }: { count: number; offset: number }) {
        let data = await Goods.findAll({
            offset,
            limit: count
        });
        data = [...data];   // 避免空造成操作不一致
        return data.map(d => d.dataValues);
    }
    async getMyGoods(userId: number) {
        let data = await Goods.findAll({
            where: {
                userId
            }
        });
        data = [...data];
        return data.map(d => d.dataValues);
    }
    async getCount() {
        const cnt = await Goods.count();
        return cnt ? cnt : 0;
    }
}

export default new GoodsService();