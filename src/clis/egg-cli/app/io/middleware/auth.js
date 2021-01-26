'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket } = ctx;
    const nsp = app.io.of('/');
    const { query } = socket.handshake; // 用户注册参数
    // 在线列表
    // 更新在线用户列表
    nsp.emit('join', {
      action: `${query.userId}join`,
    });

    await next();

    nsp.emit('leave', {
      action: `${query.userId}leave`,
    });

  };
};
