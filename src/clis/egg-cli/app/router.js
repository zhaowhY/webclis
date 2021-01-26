'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // 渲染websocket的html页面
  router.get('/', controller.socket.index);
  // CRUD模块
  router.get('/indexs', controller.index.index);
  router.post('/indexs', controller.index.create);
  router.put('/indexs/:id', controller.index.update);
  router.delete('/indexs/:id', controller.index.destory);

  // 文件模块
  router.get('/defaultFiles/:name', controller.file.defaultFile);
  router.get('/files/:name', controller.file.index);
  router.post('/files', controller.file.upload);

  // 邮件服务
  router.get('/email', controller.email.index);

  // socket.io
  io.of('/').route('message', io.controller.nsp.message);
};
