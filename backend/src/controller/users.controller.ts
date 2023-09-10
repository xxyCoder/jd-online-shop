import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express'
import { serverError, operatorSucess } from "../constant/result.constant"
import UserService from '../service/users.service';
import env from '../config/config.default';

const { createUser, modifyUserInfo, getUserId, deleteUser } = UserService;
const { JWT_SECRET } = env;

class UsersController {
    async registry(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            await createUser({ username, password });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async login(req: Request, res: Response) {
        const { username } = req.body;
        try {
            const id = await getUserId(username);
            res.send({
                ...operatorSucess,
                token: jwt.sign({ id, username }, JWT_SECRET!, { expiresIn: '1d' })
            });
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async modify(req: Request, res: Response) {
        const { username, password, id } = req.body;
        try {
            await modifyUserInfo({ username, password, id });
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
    async logout(req: Request, res: Response) {
        const { id } = req.body;
        try {
            await deleteUser(id);
            res.send(operatorSucess);
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
}

export default new UsersController();