'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    // 创建用户
    async createrUser(body) {
        try {
            const user = {
                username: body.username,
                password: body.password
            }
            await this.app.model.User.create(user);
            return true
        } catch (err) {
            console.log(err);
            return false
        }
    }

    // 获取用户列表
    async getUserList() {
        try {
            const userList = await this.app.model.User.findAll();
            return userList
        } catch (err) {
            console.log(err);
            return false
        }
    }

    // 删除用户
    async deleteUser(id) {
        try {
            await this.app.model.User.destroy({
                where: {
                    id
                }
            })
        } catch (err) {
            console.log(err);
            return false
        }
    }

    // 重置用户
    async resetUser(id, password) {
        try {
            this.app.model.User.update({
                password: password
            }, {
                where: {
                    id
                }
            })
        } catch (err) {
            console.log(err);
            return false
        }
    }

    // 登录验证
    async login(username, password) {
        try {

            let passwords = password
            const user = await this.app.model.User.findOne({
                where: {
                    username
                }
            })
            if (user) {
                let psd = user.dataValues.password
                let usr = user.dataValues.username
                if (username == usr && passwords == psd) {
                    const token = this.app.jwt.sign({
                        username: username
                    }, this.app.config.jwt.secret);
                    return token
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return false
        }
    }
}


module.exports = UserService;