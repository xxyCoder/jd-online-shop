const app = require('./app/index.js')
const { APP_PORT } = require('./config/config.default.js');

app.listen(APP_PORT, () => { // 监听3000端口，启动成功调用回调函数
    console.log(`serve is running on http://localhost:${APP_PORT}`);
})