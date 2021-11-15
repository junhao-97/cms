'use strict';

const Service = require('egg').Service;
class BlogService extends Service {
    //通过query查询条件查询博客列表
    async getBlogList(query) {
            try {
                const number = parseInt(query.page)
                const start = number * 10 - 10
                const degree = parseInt(query.total)
                const blog = await this.app.model.Blog.findAll({
                    limit: [start, degree]
                })
                return blog
            } catch (error) {
                return null
            }
        }
        //查一篇博客
    async getBlogDetail(id) {
        try {
            const blog = await this.app.model.Blog.findOne({
                where: {
                    id
                }
            })
            return blog
        } catch (error) {
            return null
        }
    }
}

module.exports = BlogService;