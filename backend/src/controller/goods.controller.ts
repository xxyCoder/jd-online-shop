import { serverError, operatorSucess } from "../constant/result.constant"
import type { Request, Response } from 'express'
import GoodService from "../service/goods.service";
import env from '../config/config.default';

const { APP_PORT } = env;
const { addGood, deleteGd, modifyGood, getMyGoods, getCount, getAllGoods } = GoodService;

class GoodsController {
    async add(req: Request, res: Response) {
        const { name, price, quantity, image, id } = req.body;
        try {
            await addGood({ name, price, quantity, image, userId: id });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async deleteGood(req: Request, res: Response) {
        const { name, id } = req.body;
        try {
            await deleteGd({ name, userId: id });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }

    }
    async modify(req: Request, res: Response) {
        const { name, price, quantity, id, newName } = req.body;
        try {
            await modifyGood({ name, price, quantity, userId: id, newName });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async getAllWithLimits(req: Request, res: Response) {
        const { count, offset } = req.query;
        const c = Number.parseInt(count as string);
        const o = Number.parseInt(offset as string);
        let data = await getAllGoods({ count: c, offset: o });
        data = data.map(d => {
            d.image = `http://localhost:${APP_PORT}/${d.image}`;
            return d;
        })
        res.send(operatorSucess);
    }
    async getMy(req: Request, res: Response) {
        const { id } = req.body;
        let result = await getMyGoods(id);
        result = result.map(d => {
            d.image = `http://localhost:${APP_PORT}/${d.image}`;
            return d;
        })
        res.send({
            ...operatorSucess,
            result
        });
    }
    async getAllGoodsCount(req: Request, res: Response) {
        const cnt = await getCount();
        res.send({
            ...operatorSucess,
            result: {
                cnt
            }
        });
    }
}

export default new GoodsController();