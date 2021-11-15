'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    async create() {
        try {
            const body = this.ctx.request.body;
            await this.ctx.service.user.createrUser(body);
            this.ctx.body = {
                code: 200,
                message: true
            }
        } catch (err) {
            this.ctx.body = {
                code: 404,
                data: "创建失败"
            }
        }
    }

    async index() {
        try {
            const userList = await this.ctx.service.user.getUserList();
            this.ctx.body = {
                code: 200,
                data: userList
            }
        } catch (err) {
            console.log(err);
            this.ctx.body = {
                code: 404,
                message: false
            }
        }
    }

    async destroy() {
        try {
            const id = await this.ctx.params.id;
            await this.ctx.service.user.deleteUser(id);
            this.ctx.body = {
                code: 200,
                message: true
            }
        } catch (err) {
            console.log(err);
            this.ctx.body = {
                code: 404,
                message: false
            }
        }
    }

    async update() {
        try {
            const body = await this.ctx.request.body;
            const id = await this.ctx.params.id;
            const user = await this.ctx.service.user.resetUser(id, body.password)
            this.ctx.body = {
                code: 200,
                message: true
            }
        } catch (err) {
            this.ctx.body = {
                code: 30000,
                message: false,
            }
        }
    }

}

module.exports = HomeController;