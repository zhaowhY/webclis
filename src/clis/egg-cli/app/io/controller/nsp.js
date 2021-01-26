'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async message() {
    const { ctx, app } = this;
    const nsp = app.io.of('/'); // 确定群组
    const message = ctx.args[0] || {}; // 用户传的参数
    const { query: { userId } } = ctx.socket.handshake; // 用户注册时的参数

    try {
      const { content } = message;
      nsp.emit('message', {
        userId,
        content
      });
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = NspController;
