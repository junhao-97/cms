'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // 后端网页
    router.get('/', controller.home.index);
    //博客
    router.get("/blog", controller.blog.getBlogList);
    router.get("/blog/:id", controller.blog.getBlogDetail);
    // 视频
    router.get('/video', controller.video.getVideoList);
    router.get('/video/:id', controller.video.getVideoDetail);
    //资源下载
    router.get("/resource", controller.resource.getResourceList);
    //书籍
    router.get("/book", controller.book.getBookList);
    router.get("/book/:id", controller.book.toFirstSection);
    router.get('/section/:id', controller.section.getSectionDetail);
    // 登录状态
    router.post("/api/login", controller.admin.login);
    // 后台功能接口
    // 博客
    router.resources('blog', '/api/blog', controller.blog);
    //资源下载
    router.resources('resource', '/api/resource', controller.resource);
    // 视频
    router.resources('video', '/api/video', controller.video);
    //书籍
    router.resources('book', '/api/book', controller.book);
    // 章
    router.resources('chapter', '/api/chapter', controller.chapter);
    //节
    router.resources('section', '/api/section', controller.section);
    //账号
    router.resources('user', '/api/user', controller.user);
    //上传图片
    router.post('/api/upload', controller.upload.index);

};