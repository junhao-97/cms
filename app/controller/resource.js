'use strict';

const Controller = require('egg').Controller;

class ResourceController extends Controller {

    async index() {
        this.ctx.body = await this.app.model.Resource.findAll();
    }

    async create() {
        let title = this.ctx.request.body.content.title;
        let code = this.ctx.request.body.content.code;
        let imgurl = this.ctx.request.body.content.imgurl;
        let downloadurl = this.ctx.request.body.content.downloadurl;
        await this.app.model.Resource.create({
            title,
            code,
            imgurl,
            downloadurl
        })
        this.ctx.body = true;
    }

    async destroy() {
        let id = this.ctx.params.id;
        await this.app.model.Resource.destroy({
            where: {
                id
            }
        })
        this.ctx.body = true;
    }

    //资源列表页面
    async getResourceList() {
        const {
            ctx
        } = this;
        let data = await this.ctx.service.website.getResourceList({
            page: 1,
            total: 100
        })
        await ctx.render("resource.html", data);
    }

}

module.exports = ResourceController;