## KONG-CLI Egg脚手架

### 集成模版内容
- CRUD(app/controller|service/index.js)
- 文件相关(app/controller/file.js)：[官方文档](https://github.com/eggjs/egg-multipart), 获取和上传文件。 
- websocket(app/io): [官方文档](https://eggjs.org/zh-cn/tutorials/socketio.html), 实现了一个聊天室demo, 启动项目(npm run dev) - 打开两个页面 - 访问http://127.0.0.1:7002 

### build step
```bash
npm i

# 本地启动
npm run dev

# 服务器启动
npm start
```


