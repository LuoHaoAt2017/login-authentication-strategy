import { Router } from "express";
import jwt from "jsonwebtoken";
import UserController from "../controller/user";
import RoleController from "../controller/role";
import { User } from "../model/user";
import formatResult from "../utils/index";
import { secret, algorithm } from "../config";

function checkLogin(req, res, next) {
  if (req.auth && req.auth.authenticated) {
    next();
  } else {
    res.status(401).send(formatResult(null, "没有登录"));
  }
}

const router = Router();

// =================== 注册登录 ====================
router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(404).send(formatResult(null, "用户名不存在"));
  }
  if (user.password === password) {
    const token = jwt.sign(
      {
        authenticated: true,
      },
      secret,
      {
        algorithm: algorithm,
        expiresIn: 1000 * 60,
      }
    );
    res.status(200).send(
      formatResult({
        token: token,
        userInfo: user,
      })
    );
  } else {
    res.status(500).send(formatResult(null, "密码错误"));
  }
});

router.put("/register", UserController.createUser);

// =================== 用户 ======================
router.all("/user", checkLogin);

router.delete("/user", UserController.deleteUser);

router.post("/user", UserController.updateUser);

router.get("/user/:userId", UserController.getUserById);

router.get("/users", checkLogin, UserController.getAllUsers);

router.get("/getUserWithRole", checkLogin, UserController.getUserWithRole);

router.post("/setUserRole", checkLogin, UserController.setUserRole);

// =================== 角色 ======================
router.all("/role", checkLogin);

router.put("/role", RoleController.createRole);

router.delete("/role", RoleController.deleteRole);

router.post("/role", RoleController.updateRole);

router.get("/role", RoleController.getAllRoles);

export default router;
