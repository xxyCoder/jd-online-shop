const fs = require('fs');
const path = require('path');
const { ImageUploadError, ArgsIsNull, ArgsIsInvalid, GoodNameIsExists, GoodIsNotExists, Nojurisdiction } = require('../constant/result.constant');
const { getGoodInfo } = require('../service/goods.service');

const saveImage = async (req, res, next) => {
    // 获取上传的文件信息
    const file = req.file;
    // 解析文件路径和文件名
    const filePath = path.parse(file.path);
    // 构建新的文件名（保留原有的后缀名）
    const newFileName = filePath.name + ".jpg";
    const newFilePath = path.join(filePath.dir, newFileName);
    req.body.image = newFileName;
    // 重命名文件
    try {
        fs.renameSync(file.path, newFilePath);
        await next();
    } catch (e) {
        console.log(e);
        res.send(ImageUploadError);
    }
}

const checkArgsIsValid = async (req, res, next) => {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
        res.send(ArgsIsNull);
        return;
    }
    if (price <= 0 || quantity <= 0) {
        res.send(ArgsIsInvalid);
        return;
    }
    const result = await getGoodInfo({ name });
    if (result) {
        res.send(GoodNameIsExists);
        return;
    }
    await next();
}

const checkNameIsNotNull = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.send(ArgsIsInvalid);
        return;
    }
    await next();
}

const checkOpIsValid = async (req, res, next) => {
    const { name, id } = req.body;
    const good = await getGoodInfo({ name });
    if (good === null) {
        res.send(GoodIsNotExists);
        return;
    }
    if (good.userId !== id) {   // 说明该商品不是这个用户上传的
        res.send(Nojurisdiction);
        return;
    }
    await next();
}

const checkArgAllIsNull = async (req, res, next) => {
    const { name, price, quantity, newName } = req.body;
    if (!name) {
        res.send(ArgsIsInvalid);
        return;
    }
    if (!price && !quantity && !newName) {
        res.send(ArgsIsNull);
        return;
    }
    if (price && price <= 0) {
        res.send(ArgsIsInvalid);
        return;
    }
    if (quantity && quantity <= 0) {
        res.send(ArgsIsInvalid);
        return;
    }
    await next();
}

const chechNewNameIsExists = async (req, res, next) => {
    const { newName } = req.body;
    if (newName) {
        const good = await getGoodInfo({ name: newName });
        if (good) {
            res.send(GoodNameIsExists);
            return;
        }
    }
    await next();
}

module.exports = {
    saveImage,
    checkArgsIsValid,
    checkNameIsNotNull,
    checkOpIsValid,
    checkArgAllIsNull,
    chechNewNameIsExists
};