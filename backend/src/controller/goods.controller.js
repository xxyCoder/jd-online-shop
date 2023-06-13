const { AddGoodError, deleteGoodError, ModifyGoodError } = require("../constant/result.constant");
const { addGood, deleteGd, modifyGood } = require("../service/goods.service");

class GoodsController {
    async add(req, res) {
        const { name, price, quantity, image, id } = req.body;
        console.log(id);
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
}

module.exports = new GoodsController();