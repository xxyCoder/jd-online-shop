import fs from 'fs';
import path from 'path';
import type { Request, Response, NextFunction } from 'express'
import { ArgsHasNull, ArgsIsInvalid, GoodNameIsExists, Nojurisdiction, GoodIsNotExists, serverError } from '../constant/result.constant';
import GoodService from '../service/goods.service';

const { getGoodInfo } = GoodService;

const saveImage = async (req: Request, res: Response, next: NextFunction) => {
    // 获取上传的文件信息
    const file = req.file;
    if (file) {
        // 解析文件路径和文件名
        const filePath = path.parse(file.path);
        // 构建新的文件名（保留原有的后缀名）
        const newFileName = filePath.name + ".jpg";
        const newFilePath = path.join(filePath.dir, newFileName);
        req.body.image = newFileName;
        // 重命名文件
        try {
            fs.renameSync(file.path, newFilePath);
            next();
        } catch (e) {
            res.send(serverError)
            console.error(e);
        }
    }
}

const checkArgsIsValid = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
        res.send(ArgsHasNull);
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
    next();
}

const checkNameIsNotNull = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
        res.send(ArgsIsInvalid);
        return;
    }
    next();
}

const checkOpIsValid = async (req: Request, res: Response, next: NextFunction) => {
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
    next();
}

const checkArgAllIsNull = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, quantity, newName } = req.body;
    if (!name) {
        res.send(ArgsIsInvalid);
        return;
    }
    if (!price && !quantity && !newName) {
        res.send(ArgsHasNull);
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
    next();
}

const chechNewNameIsExists = async (req: Request, res: Response, next: NextFunction) => {
    const { newName } = req.body;
    if (newName) {
        const good = await getGoodInfo({ name: newName });
        if (good) {
            res.send(GoodNameIsExists);
            return;
        }
    }
    next();
}

export {
    saveImage,
    checkArgsIsValid,
    checkNameIsNotNull,
    checkOpIsValid,
    checkArgAllIsNull,
    chechNewNameIsExists
};