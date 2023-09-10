import type { Request, Response } from 'express'
import { serverError, operatorSucess } from "../constant/result.constant"
import CartService from "../service/carts.service";
import GoodService from "../service/goods.service";
import UserService from "../service/users.service";
import env from '../config/config.default';

const { addToCart, deleteFromCart, getAll } = CartService;
const { getGoodInfo } = GoodService;
const { getUserInfo } = UserService;
const { APP_PORT } = env;

class CartsController {
    async add(req: Request, res: Response) {
        const { id, good, quantity } = req.body;
        try {
            await addToCart({ userId: id, good, quantity, name: good.name });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async deleteGood(req: Request, res: Response) {
        const { good, id, quantity, cart } = req.body;
        try {
            await deleteFromCart({ good, userId: id, quantity, cart });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async getAllGood(req: Request, res: Response) {
        const { id } = req.body;
        const data = await getAll(id);

        const result: Record<string, Array<{ id: number, username: string, name: string, price: number, quantity: number, image: string }>> = {};
        for (let i = 0; i < data.length; ++i) {
            const good = await getGoodInfo({ id: data[i].goodId });
            if (!good) continue;
            const user = await getUserInfo(good.userId);
            if (!user) continue;
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
            ...operatorSucess,
            result
        });
    }
}

export default new CartsController();