module.exports = () => {
    return async function(ctx, next) {
        try {
            let token = ctx.request.header.token;
            let decode = this.app.jwt.verify(user, this.app.config.jwt.secret);
            if (decode.username) {
                await next();
            } else {
                ctx.body = {
                    code: 4000,
                    msg: "用户校验失败"
                }
            }
        } catch (e) {
            ctx.body = {
                code: 4000,
                msg: "token未能通过验证"
            }
        }
    }
}