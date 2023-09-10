const UserisExists = {
    code: 2601,
    message: "用户存在"
};
const UserIsNotExists = {
    code: 2602,
    message: "用户不存在"
};
const PasswordsNotSame = {
    code: 2603,
    message: "两次密码不一致"
};
const tokenExpiredError = {
    code: 1601,
    message: "token过期了"
};
const invalidToken = {
    code: 1602,
    message: "token无效"
};
const ArgsHasNull = {
    code: 1603,
    message: "参数存在空值"
};
const ArgsIsInvalid = {
    code: 1401,
    message: "参数不合法"
};
const GoodNameIsExists = {
    code: 3401,
    message: "商品名已经存在"
};
const AddGoodError = {
    code: 3401,
    message: "商品上架失败"
};
const Nojurisdiction = {
    code: 1605,
    message: "没有权限"
};
const GoodIsNotExists = {
    code: 3603,
    message: "商品不存在"
};
const serverError = {
    code: 1501,
    message: "服务器出错了"
}
const operatorSucess = {
    code: 0,
    message: "操作成功"
}

export {
    UserisExists,
    UserIsNotExists,
    PasswordsNotSame,
    tokenExpiredError,
    invalidToken,
    ArgsIsInvalid,
    GoodNameIsExists,
    AddGoodError,
    Nojurisdiction,
    GoodIsNotExists,
    serverError,
    operatorSucess,
    ArgsHasNull
}