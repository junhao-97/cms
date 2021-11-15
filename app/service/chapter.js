'use strict';

const Service = require('egg').Service;

class ChapterService extends Service {

    //通过书的ID获取此书籍的章节
    async getChapterList(book_id) {
        try {
            const chapterList = await this.app.model.Chapter.findAll({
                include: [{
                    model: this.app.model.Book,
                    as: 'book'
                }],
                where: {
                    book_id: book_id
                }
            });
            return chapterList
        } catch (error) {
            console.log(error);
            return false
        }
    }

}

module.exports = ChapterService;