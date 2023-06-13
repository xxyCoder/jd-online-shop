const jwt = require('jsonwebtoken');

const { RegistryError, RegistrySuccess, modifyInfoError, UserLoginError, LogoutError } = require('../constant/result.constant');
const { createUser, modifyUserInfo, getUserId, deleteUser } = require('../service/users.service');
const { JWT_SECRET } = require('../config/config.default')

class UsersController {
    async registry(req, res) {
        const { username, password } = req.body;

        try {
            await createUser({ username, password });
            res.send(RegistrySuccess);
        } catch (e) {
            console.log(e);
            res.send(RegistryError);
        }
    }
    async login(req, res) {
        const { username } = req.body;
        try {
            const id = await getUserId(username);
            const result = {
                code: 1201,
                message: "登录成功",
                token: jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '1d' })
            }
            res.send(result);
        } catch (e) {
            console.log(e);
            res.send(UserLoginError);
        }
    }
    async modify(req, res) {
        const { username, password, id } = req.body;
        try {
            await modifyUserInfo({ username, password, id });
            res.send({
                code: 1203,
                message: "修改成功"
            });
        } catch (e) {
            console.log(e);
            res.send(modifyInfoError);
        }
    }
    async logout(req, res) {
        const { id } = req.body;
        try {
            await deleteUser(id);
            res.send({
                code: 1204,
                message: "注销成功"
            });
        } catch (e) {
            console.log(e);
            res.send(LogoutError);
        }
    }
}

module.exports = new UsersController();