const { GoodIsNotExists, ArgsIsNull, ArgsIsInvalid } = require('../constant/result.constant');
const { getCartInfo } = require('../service/carts.service');
const { getGoodInfo } = require('../service/goods.service');

const checkGoodIsExists = async (req, res, next) => {
    const { goodName } = req.body;
    const good = await getGoodInfo({ name: goodName });
    if (!good) {
        res.send(GoodIsNotExists);
        return;
    }
    req.body.good = good;
    await next();
}

const checkArgsNotNull = async (req, res, next) => {
    const { goodName, quantity } = req.body;
    if (!goodName || !quantity) {
        res.send(ArgsIsNull);
        return;
    }
    if (quantity === 0) {
        res.send(ArgsIsInvalid);
        return;
    }
    await next();
}

const checkOpIsValid = async (req, res, next) => {
    const { good, id } = req.body;
    const cart = await getCartInfo({ goodId: good.id, userId: id });
    if (!cart) {
        console.log(`购物车中没有${good.name}`);
        res.send(ArgsIsInvalid);
        return;
    }
    req.body.cart = cart;
    await next();
}

module.exports = {
    checkGoodIsExists,
    checkArgsNotNull,
    checkOpIsValid
}