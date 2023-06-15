const { addToCart, deleteFromCart, getAll } = require("../service/carts.service");
const { getGoodInfo } = require("../service/goods.service");
const { getUserInfo } = require("../service/users.service");
const { APP_PORT } = require('../config/config.default')

class CartsController {
    async add(req, res) {
        const { id, good, quantity } = req.body;
        try {
            await addToCart({ userId: id, good, quantity, name: good.name });
            res.send({
                code: 4200,
                message: "添加成功"
            });
        } catch (e) {
            res.send({
                code: 4400,
                message: "添加失败"
            })
            console.log(e);
        }
    }
    async deleteGood(req, res) {
        const { good, id, quantity, cart } = req.body;
        try {
            await deleteFromCart({ good, userId: id, quantity, name: good.name, cart });
            res.send({
                code: 4201,
                message: "移除成功"
            });
        } catch (e) {
            console.log(e);
            res.send({
                code: 4401,
                message: "移除失败"
            });
        }
    }
    async getAllGood(req, res) {
        const { id } = req.body;
        const data = await getAll(id);

        const result = {};
        for (let i = 0; i < data.length; ++i) {
            const good = await getGoodInfo({ id: data[i].goodId });
            const user = await getUserInfo(good.userId);
            if (!result[user.username]) {
                result[user.username] = [];
            }
            result[user.username].push({
                id: good.id,
                username: user.username,
                name: good.name,
                price: good.price,
                quantity: data[i].quantity,
                image: `http://localhost:${APP_PORT}/${good.image}`
            });
        }
        res.send({
            code: 0,
            message: "获取成功",
            result
        });
    }
}

module.exports = new CartsController();