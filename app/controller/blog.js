'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
    // 显:将mysql中的Blog数据显示出来传递给前端
    async index() {
            this.ctx.body = await this.app.model.Blog.findAll();
        }
        // 增：根据前端传送来的数据创建mysql数据库
    async create() {
            let title = this.ctx.request.body.content.title;
            let imgurl = this.ctx.request.body.content.imgurl;
            let md_text = this.ctx.request.body.content.md_text;
            let html_text = this.ctx.request.body.content.html_text;
            await this.app.model.Blog.create({
                title,
                imgurl,
                md_text,
                html_text,
            })
            this.ctx.body = true;
        }
        // 删:根据id删除数据
    async destroy() {
            let id = this.ctx.params.id;
            await this.app.model.Blog.destroy({
                where: {
                    id
                }
            })
            this.ctx.body = true;
        }
        // 改：根据id修改相应数据并保存
    async update() {
            let id = this.ctx.params.id;
            let imgurl = this.ctx.request.body.content.imgurl;
            let title = this.ctx.request.body.content.title;
            let md_text = this.ctx.request.body.content.md_text;
            let html_text = this.ctx.request.body.content.html_text;
            await this.app.model.Blog.update({
                imgurl,
                title,
                md_text,
                html_text,
            }, {
                // 根据id修改
                where: {
                    id
                }
            })
            this.ctx.body = true;
        }
        //根据id查找指定的一篇博客
    async show() {
            let id = this.ctx.params.id;
            let detail = await this.app.model.Blog.findOne({
                where: {
                    id
                }
            })
            if (detail) {
                this.ctx.body = detail;
            } else {
                this.ctx.body = false;
            }
        }
        // 用nunjucks渲染render页面，在view中编写html文件
        //     博客列表页面
        // async getBlogList() {
        //         let list = await this.app.model.Blog.findAll()
        //         await this.ctx.render("blog", { list })
        //     }
        //     博客详情页面
        // async getBlogDetail() {
        //     let id = this.ctx.params.id;
        //     let detail = await this.app.model.Blog.findOne({
        //         where: {
        //             id
        //         }
        //     });
        //     if (detail) {
        //         await this.ctx.render("blog_detail.html", { detail })
        //     } else {
        //         this.ctx.body = "获取页面失败"
        //     }
        // }
        //博客列表页面
    async getBlogList() {
            const {
                ctx
            } = this;
            let data = await this.ctx.service.website.getBlogList({
                page: 1,
                total: 100
            })
            await ctx.render("blog.html", data);
        }
        //博客详情页面
    async getBlogDetail() {
        const {
            ctx
        } = this;
        const id = this.ctx.params.id; //获取博客id
        let data = await this.ctx.service.website.getBlogDetail(id); //博客详情
        await ctx.render("blog_detail.html", data);
    }
}

module.exports = BlogController;