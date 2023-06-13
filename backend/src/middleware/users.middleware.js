const bcrpty = require('bcryptjs');     // 用于将密码散列（哈希）为安全的字符串
const { PasswordsNotSame, ArgsIsNull, UserisExists, UserIsNotExists, PasswordError, UserLoginError, AllArgsIsNull } = require("../constant/result.constant");
const { userIsExists } = require("../service/users.service");

const checkTwicePasswordIsSame = async (req, res, next) => {
    const password = req.body.password;
    const confirmPassowrd = req.body.confirmPassword;
    if (password !== confirmPassowrd) {
        res.send(PasswordsNotSame);
    }
    await next();
}

const checkArgsIsNotNull = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.send(ArgsIsNull);
    }
    await next();
}

const checkUserIsExists = async (req, res, next) => {
    const username = req.body.username;
    if (username) {
        let user = await userIsExists({ username });
        if (user !== null) { // 说明该用户存在，不可以修改成该用户名或以该用户名注册
            res.send(UserisExists);
        }
    }
    await next();
}

const crpytPassword = async (req, res, next) => {   // 密码加密
    const { password } = req.body;
    if (password) { // 有密码就加密
        const salt = bcrpty.genSaltSync(10);
        const hash = bcrpty.hashSync(password, salt);    // hash保存的是密文
        req.body.password = hash;
    }
    await next();
}

const verifyLogin = async (req, res, next) => {    // 验证登录
    const { username, password } = req.body;

    try {
        const data = await userIsExists({ username });   // 判断用户是否存在
        if (!data) {
            console.log(`${username}不存在`);
            res.send(UserIsNotExists);
            return;
        }
        if (!bcrpty.compareSync(password, data.password)) {    // 判断密码
            res.send(PasswordError);
            return;
        }
        await next();
    } catch (e) {
        console.log(e);
        res.send(UserLoginError);
    }
}

const checkArgBothIfNull = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username && !password) {   // 修改信息要么修改其中一个，要么全修改，不能一个都不修改
        res.send(AllArgsIsNull);
        return;
    }
    await next();
}

module.exports = {
    checkTwicePasswordIsSame,
    checkArgsIsNotNull,
    checkUserIsExists,
    crpytPassword,
    verifyLogin,
    checkArgBothIfNull
};