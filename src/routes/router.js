import Vue from "vue";
import { Router } from "express";
import passport from "passport";
import { createRenderer } from "vue-server-renderer";
import UserController from "../controller/user";
import RoleController from "../controller/role";
// import ACL from '../middleware/acl/casbin';
const router = Router();

const render = createRenderer({
  // 为整个页面的 HTML 提供一个模板。此模板应包含注释 <!--vue-ssr-outlet-->，作为渲染应用程序内容的占位符。
  template: `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
        <title>RBAC</title>
        <style type="text/css">
          body {
            width: 80%;
            margin: 0 auto;
          }
          form {
            width: 100%;
            margin: 200px auto;
            padding: 50px 20px;
            border: thin solid #eee;
            border-radius: 4px;
          }
          .form-group {
            display: flex;
          }
          .form-group label {
            width: 150px;
          }
        </style>
      </head>
      <body>
        <!-- 这里将是应用程序 HTML 标记注入的地方。 -->
        <!--vue-ssr-outlet-->
      </body>
    </html>
    `,
});

function checkLogin(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
}

// =================== 注册登录 ======================

router.get("/", checkLogin, function (req, res) {
  res.status(200).send(`
    <html>
      <head>
      </head>
      <body>
        <div>欢迎来到三体世界</div>
      </body>
    </html>
  `);
});

router.get("/login", function (req, res) {
  const app = new Vue({
    template: `
      <form action="/login" method="post" enctype="application/x-www-form-urlencoded">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control" name="username" id="username">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="form-group">
          <div class="btn-group" role="group" style="width:100%;">
            <button type="submit" class="btn btn-primary">登录</button>
            <a href="/register" class="btn btn-success" role="button">前往注册</a>
          </div>
        </div>
      </form>
    `,
  });

  render.renderToString(app, function (err, html) {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.status(200).send(html);
  });
});

router.get("/register", function (req, res) {
  const app = new Vue({
    template: `
      <form action="/register" method="put" enctype="application/x-www-form-urlencoded">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control" name="username" id="username">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="form-group">
          <div class="btn-group" role="group" style="width:100%;">
            <button type="submit" class="btn btn-primary">注册</button>
            <a href="/login" class="btn btn-success" role="button">前往登录</a>
          </div>
        </div>
      </form>
    `,
  });

  render.renderToString(app, function (err, html) {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.status(200).send(html);
  });
});

router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    failureMessage: "登录失败",
  }),
  function (req, res) {
    if (req.session) {
      console.log("isAuthenticated: ", true);
      req.session.isAuthenticated = true;
    }
    res.status(200).redirect("/");
  }
);

router.put("/register", UserController.createUser);

router.get("/logout", checkLogin, function(req, res) {
  req.session.isAuthenticated = false;
  res.redirect("/login");
});

// =================== 用户 ======================
router.all("/user", checkLogin);

router.delete("/user", UserController.deleteUser);

router.post("/user", UserController.updateUser);

router.post("/setUserRole", UserController.setUserRole);

router.get("/user", UserController.getAllUsers);

router.get("/getUserWithRole", UserController.getUserWithRole);

// =================== 角色 ======================
router.all("/role", checkLogin);

router.put("/role", RoleController.createRole);

router.delete("/role", RoleController.deleteRole);

router.post("/role", RoleController.updateRole);

router.get("/role", RoleController.getAllRoles);

export default router;
