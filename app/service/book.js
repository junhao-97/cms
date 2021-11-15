'use strict';

const Service = require('egg').Service;

class BookService extends Service {
    //查询所有书籍列表
    async getBookList(query) {
        try {
            const number = parseInt(query.page)
            const start = number * 10 - 10
            const degree = parseInt(query.total)
            const bookList = await this.app.model.Book.findAll({
                limit: [start, degree],
            })
            return bookList
        } catch (error) {
            return null
        }
    }
    async getFirstSectionIdByBookId(id) {
        const chapters = await this.app.model.Chapter.findAll({
            where: {
                book_id: id
            }
        })
        let firstChapterId = chapters[0].dataValues.id;
        const sections = await this.app.model.Section.findAll({
            where: {
                chapter_id: firstChapterId
            }
        })
        console.log("~~~~~~~~~~~")
        console.log(chapters)
        return sections[0].dataValues.id;
    }
}


module.exports = BookService;