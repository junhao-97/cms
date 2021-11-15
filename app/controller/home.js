'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        let data = await this.ctx.service.website.getHomePageData();
        await ctx.render("home", data)
    }
}

module.exports = HomeController;