const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError, invalidToken } = require('../constant/result.constant');

const auth = async (req, res, next) => {  // 验证用户
    const { authorization } = req.headers;   // token 在放在authorization中
    const token = authorization.replace('Bearer ', '');
    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.body.id = user.id;    // 让其他中间件也可以访问到数据
        await next();
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期');
                res.send(tokenExpiredError);
                break;
            case 'JsonWebTokenError':
                console.error('无效token');
                res.send(invalidToken);
                break;
        }
    }
}

module.exports = {
    auth
};