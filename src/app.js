import path from "path";
import moment from "moment";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import flash from 'connect-flash';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github";
import favicon from "serve-favicon";
import router from "./routes/router";
import connect from "./model/index";
import { User } from "./model/user";

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
  app.use(flash());
  // session
  app.use(
    expressSession({
      secret: "tomcat",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  // 配合 express-session
  app.use(passport.session());
  // Password Strategy
  passport.use(
    new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: false,
      session: true,
    }, async function (username, password, done) {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      if (user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  ));
  // Github Strategy 第三方授权
  passport.use(
    new GithubStrategy({
      clientID: "5da257981eb189aa55ea",
      clientSecret: "8796431f671aecbc57f48d030b930163758a5976",
      authorizationURL: "https://github.com/login/oauth/authorize",
      tokenURL: "https://github.com/login/oauth/access_token",
      userProfileURL: "https://api.github.com/user",
      callbackURL: "http://localhost:5001/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const [user, created] = await User.findOrCreate({
          where: {
            githubId: profile.id
          },
          defaults: {
            username: profile.name || 'root',
            password: profile.pass || 'root',
            githubId: profile.id,
          }
        });
        cb(null, user);
      } catch(err) {
        cb(err, null);
      }
    }
  ));
  // 为了使持久会话工作，经过身份验证的用户必须序列化到会话。
  passport.serializeUser(function (user, done) {
    // 对序列化的内容不限制，可以是 userId 或者 user。
    done(null, user.id);
  });
  // 维护持久的登录会话，后续请求时反序列化。
  passport.deserializeUser(async function (id, done) {
    try {
      // 序列化和逆序列化要匹配，逆序列化的任务是根据序列化的内容获取用户的信息。
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  // 注册路由
  app.use(router);
  // 指定端口
  app.listen(5001, function () {
    console.log(
      "server listen on 5001 at ",
      moment().format("YYYY-MM-DD hh:mm:ss")
    );
  });
})();
