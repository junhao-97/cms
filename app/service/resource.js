'use strict';

const Service = require('egg').Service;

class ResourceService extends Service {
    //通过query查询条件查询资源列表
    async getResourceList(query) {
        try {
            const number = parseInt(query.page)
            const start = number * 10 - 10
            const degree = parseInt(query.total)
            const resourceList = await this.app.model.Resource.findAll({
                limit: [start, degree]
            })
            return resourceList
        } catch (error) {
            return null
        }
    }
}
module.exports = ResourceService;