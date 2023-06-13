const { addToCart, deleteFromCart } = require("../service/carts.service");

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
}

module.exports = new CartsController();