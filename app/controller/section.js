'use strict';

const Controller = require('egg').Controller;

class SectionController extends Controller {

    async index() {
        let chapter_id = this.ctx.request.query.chapter_id;
        const sectionList = await this.ctx.service.section.getSectionList(chapter_id);
        this.ctx.body = {
            code: 2000,
            message: true,
            data: sectionList
        }
    }

    async create() {
        let title = this.ctx.request.body.title;
        let chapter_id = this.ctx.request.body.chapter_id;
        let md_text = this.ctx.request.body.md_text;
        let html_text = this.ctx.request.body.html_text;
        await this.app.model.Section.create({
            title,
            chapter_id,
            md_text,
            html_text
        })
        this.ctx.body = true;
    }

    async destroy() {
        let id = this.ctx.params.id;
        await this.app.model.Section.destroy({
            where: {
                id
            }
        })
        this.ctx.body = true;
    }

    async update() {
        let id = this.ctx.params.id;
        let title = this.ctx.request.body.title;
        let chapter_id = this.ctx.request.body.chapter_id;
        let md_text = this.ctx.request.body.md_text;
        let html_text = this.ctx.request.body.html_text;
        await this.app.model.Section.update({
            title,
            md_text,
            html_text,
            chapter_id
        }, {
            // 根据id修改
            where: {
                id
            }
        })
        this.ctx.body = true;
    }

    async getSectionDetail() {
        const id = this.ctx.params.id;
        let data = await this.ctx.service.website.getSectionDetail(id)
        await this.ctx.render("book_detail.html", data);
    }
}

module.exports = SectionController;