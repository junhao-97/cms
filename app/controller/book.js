'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {

    async index() {
        this.ctx.body = await this.app.model.Book.findAll()
    }

    async create() {
        let title = this.ctx.request.body.title;
        let imgurl = this.ctx.request.body.imgurl;
        await this.app.model.Book.create({
            title,
            imgurl
        })
        this.ctx.body = true;
    }

    async destroy() {
            let id = this.ctx.params.id;
            await this.app.model.Book.destroy({
                where: {
                    id
                }
            })
            this.ctx.body = true;
        }
        // async getBookList() {
        //     let list = await this.ctx.app.model.Book.findAll(); 
        //     await this.ctx.render("book.html", { list })
        // }
        //书籍列表页面
    async getBookList() {
            let data = await this.ctx.service.website.getBookList(); //获取书列表
            await this.ctx.render("book.html", data);
        }
        //
    async toFirstSection() {
        const id = this.ctx.params.id;
        let section_id = await this.ctx.service.book.getFirstSectionIdByBookId(id);
        await this.ctx.redirect(`/section/${section_id}`)
    }
}

module.exports = BookController;