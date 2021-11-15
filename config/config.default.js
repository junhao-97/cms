/* eslint valid-jsdoc: "off" */
const fs = require("fs");
const path = require("path");
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1633933202298_2233';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    config.jwt = {
        secret: "junhaocms"
    };
    config.sequelize = {
        dialect: 'mysql',
        database: 'junhaocms',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        timezone: '+08:00',
    };
    //设置上传文件
    config.multipart = {
        fileSize: 300 * 1000 * 1000 //设置上传限制为300M
    };
    config.security = {
        csrf: {
            enable: false, // 前后端分离，post请求不方便携带_csrf
        },
        domainWhiteList: [
            '*',
        ], //配置白名单
    };
    config.cors = {
        origin: "*", //允许所有跨域访问，注释掉则允许上面 白名单 访问
        credentials: true, // 允许跨域请求携带cookies
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    config.view = {
        defaultViewEngine: 'nunjucks'
    };
    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(__dirname, 'favicon.ico')),
    };
    //设置静态文件目录
    // config.static = {
    //     prefix: '/static', //访问路径
    //     dir: path.join(appInfo.baseDir, 'app/public'), //设置静态文件目录
    // };
    // static files and cache files
    config.static = {
        // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
        prefix: '/',
        dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    };
    return {
        ...config,
        ...userConfig,
    };
};