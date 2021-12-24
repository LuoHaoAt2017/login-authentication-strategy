import { Router } from "express";
import UserController from "../controller/user";
import RoleController from "../controller/role";
// import ACL from '../middleware/acl/casbin';
const router = Router();

router.put("/register", UserController.createUser);

router.post("/login", UserController.login);

// 访问之前先判断是否登录，是否有权限

// =================== 用户 ======================

router.delete("/user", UserController.deleteUser);

router.post("/user", UserController.updateUser);

router.post("/setUserRole",UserController.setUserRole);

router.get("/user", UserController.getAllUsers);

router.get("/getUserWithRole", UserController.getUserWithRole);

// =================== 角色 ======================
router.put("/role", RoleController.createRole);

router.delete("/role", RoleController.deleteRole);

router.post("/role", RoleController.updateRole);

router.get("/role", RoleController.getAllRoles);

export default router;
