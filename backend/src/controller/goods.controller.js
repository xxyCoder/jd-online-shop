const { AddGoodError, deleteGoodError, ModifyGoodError } = require("../constant/result.constant");
const { addGood, deleteGd, modifyGood, getAllGoods, getMyGoods } = require("../service/goods.service");
const { APP_PORT } = require('../config/config.default')

class GoodsController {
    async add(req, res) {
        const { name, price, quantity, image, id } = req.body;
        try {
            await addGood({ name, price, quantity, image, userId: id });
            res.send({
                code: 3200,
                message: "上架成功"
            });
        } catch (e) {
            console.log(e);
            res.send(AddGoodError);
        }
    }
    async deleteGood(req, res) {
        const { name, id } = req.body;
        try {
            await deleteGd({ name, userId: id });
            res.send({
                code: 3201,
                message: "下架成功"
            });
        } catch (e) {
            console.log(e);
            res.send(deleteGoodError);
        }

    }
    async modify(req, res) {
        const { name, price, quantity, id, newName } = req.body;
        try {
            await modifyGood({ name, price, quantity, userId: id, newName });
            res.send({
                code: 3202,
                message: "修改成功"
            });
        } catch (e) {
            console.log(e);
            res.send(ModifyGoodError);
        }
    }
    async getAll(req, res) {
        let data = await getAllGoods();
        data = data.map(d => {
            d.image = `http://localhost:${APP_PORT}/${d.image}`;
            return d;
        })
        res.send({
            code: 3203,
            message: "获取成功",
            result: data
        });
    }
    async getMy(req, res) {
        const { id } = req.body;
        let data = await getMyGoods(id);
        data = data.map(d => {
            d.image = `http://localhost:${APP_PORT}/${d.image}`;
            return d;
        })
        res.send({
            code: 3203,
            message: "获取成功",
            result: data
        });
    }
}

module.exports = new GoodsController();