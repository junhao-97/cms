'use strict';

const Service = require('egg').Service;

class SectionService extends Service {

    //通过章的ID获取此书籍的节
    async getSectionList(chapter_id) {
        try {
            const sectionList = await this.app.model.Section.findAll({
                include: [{
                    model: this.app.model.Chapter,
                    as: 'chapter'
                }],
                where: {
                    chapter_id: chapter_id
                }
            });
            return sectionList
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getSectionDetail(id) {
        try {
            const section = await this.app.model.Section.findOne({
                where: {
                    id
                }
            });
            return section
        } catch (error) {
            return false
        }
    }

    // 通过书的id获取这本书的章节目录
    async getMenuBySectionId(id) {
        const section = await this.app.model.Section.findOne({
            where: {
                id
            },
            include: {
                model: this.app.model.Chapter,
                as: "chapter",
                include: {
                    model: this.app.model.Book,
                    as: "book"
                }
            }
        });

        let book_id = section.dataValues.chapter.dataValues.book.dataValues.id;
        const chapters = await this.app.model.Chapter.findAll({
            where: {
                book_id
            }
        })

        for (let item of chapters) {
            let chapter_id = item.dataValues.id;
            const sections = await this.app.model.Section.findAll({
                where: {
                    chapter_id
                }
            })
            item.dataValues.sectionList = sections;
        }

        return chapters;
    }
}

module.exports = SectionService;