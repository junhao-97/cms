'use strict';

const Controller = require('egg').Controller;
const fs = require("fs")
const path = require("path")
const pump = require("pump")
class UploadController extends Controller {
    //上传图片
    async index() {
        const stream = await this.ctx.getFileStream();
        const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
        //指定上传目录
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        this.ctx.body = {
            code: 20000,
            data: {
                name: filename,
                // file: `/uploads/${filename}` //正式地址
                //uploads是public文件夹下的文件夹
                file: `http://127.0.0.1:7001/uploads/${filename}` //临时服务器地址
            }
        }
        console.log(this.ctx.body);
    }
}

module.exports = UploadController;