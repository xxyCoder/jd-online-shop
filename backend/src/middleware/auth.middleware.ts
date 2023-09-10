import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express'
import env from '../config/config.default'
import { tokenExpiredError, invalidToken } from '../constant/result.constant';

const { JWT_SECRET } = env;

interface JwtPayload {
    id: number;
    username: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {  // 验证用户
    const { authorization } = req.headers;   // token 在放在authorization中
    if (!authorization) {
        res.send({
            code: 1604,
            message: "没有token"
        });
        return;
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const user = jwt.verify(token, JWT_SECRET!) as JwtPayload;
        req.body.id = user.id;    // 让其他中间件也可以访问到数据
        next();
    } catch (err: any) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.warn('token过期');
                res.send(tokenExpiredError);
                break;
            case 'JsonWebTokenError':
                console.warn('无效token');
                res.send(invalidToken);
                break;
        }
    }
}

export {
    auth
};