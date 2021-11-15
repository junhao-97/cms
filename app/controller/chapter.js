'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {

    async index() {
        let book_id = this.ctx.request.query.book_id;
        const chapterList = await this.ctx.service.chapter.getChapterList(book_id);
        this.ctx.body = {
            code: 2000,
            message: true,
            data: chapterList
        }
    }

    async create() {
        let title = this.ctx.request.body.title;
        let book_id = this.ctx.request.body.book_id;
        await this.app.model.Chapter.create({
            title,
            book_id,
        })
        this.ctx.body = true;
    }

    async destroy() {
        let id = this.ctx.params.id;
        await this.app.model.Chapter.destroy({
            where: {
                id
            }
        })
        this.ctx.body = true;
    }


}

module.exports = ChapterController;