import { GoodIsNotExists, ArgsHasNull, ArgsIsInvalid } from '../constant/result.constant';
import type { Request, Response, NextFunction } from 'express'
import CartService from '../service/carts.service';
import GoodService from '../service/goods.service';

const { getCartInfo } = CartService;
const { getGoodInfo } = GoodService;

const checkGoodIsExists = async (req: Request, res: Response, next: NextFunction) => {
    const { goodName } = req.body;
    const good = await getGoodInfo({ name: goodName });
    if (!good) {
        res.send(GoodIsNotExists);
        return;
    }
    req.body.good = good;
    next();
}

const checkArgsNotNull = async (req: Request, res: Response, next: NextFunction) => {
    const { goodName, quantity } = req.body;
    if (!goodName || !quantity) {
        res.send(ArgsHasNull);
        return;
    }
    if (quantity === 0) {
        res.send(ArgsIsInvalid);
        return;
    }
    next();
}

const checkOpIsValid = async (req: Request, res: Response, next: NextFunction) => {
    const { good, id } = req.body;
    const cart = await getCartInfo({ goodId: good.id, userId: id });
    if (!cart) {
        console.warn(`购物车中没有${good.name}`);
        res.send(ArgsIsInvalid);
        return;
    }
    req.body.cart = cart;
    next();
}

export {
    checkGoodIsExists,
    checkArgsNotNull,
    checkOpIsValid
}