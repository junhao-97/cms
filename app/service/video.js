"use strict";

const Service = require("egg").Service;

class VideoService extends Service {
    //根据视频类别查找视频
    async getVideoList(query) {
        try {
            const number = parseInt(query.page)
            const start = number * 10 - 10
            const degree = parseInt(query.total)
            const videoList = await this.app.model.Video.findAll({
                limit: [start, degree]
            })
            return videoList
        } catch (error) {
            return null
        }
    }

    //通过视频本身id查找视频
    async getVideoDetail(id) {
        try {
            let video = await this.app.model.Video.findOne({
                where: {
                    id: id
                }
            });
            return video
        } catch (error) {
            return false;
        }
    }

}

module.exports = VideoService;