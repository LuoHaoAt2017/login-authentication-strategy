import path from "path";
import cors from "cors";
import moment from "moment";
import express from "express";
import expressJwt from "express-jwt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import router from "./routes/router";
import connect from "./model/index";
import { secret, algorithm } from './config';
(async function server() {
  // 链接数据库
  await connect();
  const app = express();
  // 虚拟路径前缀
  app.use("/static", express.static("./src/assets"));
  app.use(favicon(path.join(__dirname, "assets/ico", "favicon.ico")));
  // 解析 form 参数
  app.use(bodyParser.urlencoded({ extended: false }));
  // 解析 json 参数
  app.use(bodyParser.json());
  app.use(cookieParser());
  // 解决跨域
  app.use(cors({
    origin: ["http://localhost:8088"], // Access-Control-Allow-Origin
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD'], // Access-Control-Allow-Methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Access-Control-Allow-Headers
    credentials: true, // Access-Control-Allow-Credentials
    maxAge: 600, // Access-Control-Max-Age: <delta-seconds>

  }));
  // jwt
  app.use(expressJwt({
    secret: secret,
    algorithms: [algorithm],
    requestProperty: "auth",
    credentialsRequired: false
  }).unless({
    path: [{
      url: '/login',
      method: ['GET', 'POST']
    }, {
      url: '/register',
      methods: ['GET', 'PUT']
    }, {
      url: '/logout'
    }]
  }));
  // 注册路由
  app.use(router);
  // 错误处理
  app.use(function(err, req, res, next) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).redirect("/login");
    } else {
      next();
    }
  });
  // 指定端口
  app.listen(5001, function () {
    console.log(
      "server listen on 5001 at ",
      moment().format("YYYY-MM-DD hh:mm:ss")
    );
  });
})();
