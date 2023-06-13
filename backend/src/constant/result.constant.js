module.exports = {
    UserisExists: {
        code: 1300,
        message: "用户存在"
    },
    UserIsNotExists: {
        code: 1301,
        message: "用户不存在"
    },
    RegistryError: {
        code: 1400,
        message: "注册失败"
    },
    RegistrySuccess: {
        code: 1200,
        message: "注册成功"
    },
    PasswordsNotSame: {
        code: 1401,
        message: "两次密码不一致"
    },
    ArgsIsNull: {
        code: 1402,
        message: "没有输入完整"
    },
    tokenExpiredError: {
        code: 2400,
        message: "token过期了"
    },
    invalidToken: {
        code: 2401,
        message: "token无效"
    },
    PasswordError: {
        code: 1403,
        message: "密码错误"
    },
    UserLoginError: {
        code: 1404,
        message: "用户登录失败"
    },
    AllArgsIsNull: {
        code: 2402,
        message: "参数全部为空"
    },
    modifyInfoError: {
        code: 1405,
        message: "用户修改个人信息失败"
    },
    LogoutError: {
        code: 1406,
        message: "注销失败"
    },
    ImageUploadError: {
        code: 2403,
        message: "图片上传失败"
    },
    ArgsIsInvalid: {
        code: 2404,
        message: "参数不合法"
    },
    GoodNameIsExists: {
        code: 3400,
        message: "商品名已经存在"
    },
    AddGoodError: {
        code: 3401,
        message: "商品上架失败"
    },
    Nojurisdiction: {
        code: 2405,
        message: "没有权限"
    },
    deleteGoodError: {
        code: 3402,
        message: "下架失败"
    },
    GoodIsNotExists: {
        code: 3403,
        message: "商品不存在"
    },
    ModifyGoodError: {
        code: 3404,
        message: "修改失败"
    }
};