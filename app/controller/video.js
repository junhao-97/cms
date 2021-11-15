'use strict';

const Controller = require('egg').Controller;

class VideoController extends Controller {

    async index() {
        this.ctx.body = await this.app.model.Video.findAll();
    }

    async create() {
        let title = this.ctx.request.body.title;
        let iframe = this.ctx.request.body.iframe;
        let imgurl = this.ctx.request.body.imgurl;
        await this.app.model.Video.create({
            title,
            iframe,
            imgurl
        })
        this.ctx.body = true;
    }

    async destroy() {
        let id = this.ctx.params.id;
        await this.app.model.Video.destroy({
            where: {
                id
            }
        })
        this.ctx.body = true;
    }


    //视频列表页面
    async getVideoList() {
            const { ctx } = this;
            let data = await this.ctx.service.website.getVideoList({
                page: 1,
                total: 100
            });
            await ctx.render("video.html", data);
        }
        //视频详情页面
    async getVideoDetail() {
        const { ctx } = this;
        let id = this.ctx.params.id;
        let data = await this.ctx.service.website.getVideoDetail(id);
        await ctx.render("video_detail.html", data);
    }
}

module.exports = VideoController;