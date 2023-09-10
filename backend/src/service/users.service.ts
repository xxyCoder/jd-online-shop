import Users from '../model/users.model';  // 导入视图，对数据库进行操作
import type { UserModel } from '../model/users.model'

class UsersService {
    async createUser({ username, password }: { username: string, password: string }) {
        // 创建用户并保存在数据库中
        await Users.create({ username, password });
    }
    async deleteUser(id: number) {
        // 返回被删除的行数
        const count = await Users.destroy({
            where: {
                id
            }
        });
        return count;
    }
    async userIsExists({ username, password }: UserModel) {    // 即可查询是否存在该用户，也可以验证用户名密码是否正确
        const whereOp = {};
        username && Object.assign(whereOp, { username });
        password && Object.assign(whereOp, { password });
        const res = await Users.findOne({
            where: whereOp
        });
        return res ? res.dataValues : null;
    }
    async modifyUserInfo({ id, username, password }: UserModel) {  // 根据用户id，可以修改用户名或密码，或者都修改
        const whereOp = { id };
        const updateOp = {};
        username && Object.assign(updateOp, { username });
        password && Object.assign(updateOp, { password });
        const res = await Users.update(updateOp, {
            where: whereOp
        });
        return res;
    }
    async getUserId(username: string) {
        const res = await Users.findOne({
            where: {
                username
            }
        });
        return res ? res.dataValues.id : null;
    }
    async getUserInfo(id: number) {
        const res = await Users.findOne({
            where: {
                id
            }
        });
        return res ? res.dataValues : null;
    }
}

export default new UsersService();