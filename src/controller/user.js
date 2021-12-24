import { User } from "../model/user";
import { Role } from "../model/role";
import formatResult from "../utils/index";

async function login(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user =  await User.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      res.status(500).send(formatResult(null, "用户名不存在"));
    } else if (user.password === password) {
      // 
      res.status(200).send(formatResult("登录成功"));
    } else {
      res.status(500).send(formatResult(null, "密码错误"));
    }
  } catch(err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function createUser(req, res) {
  try {
    const data = await User.create({
      username: req.body.username,
      nickname: req.body.nickname,
      password: req.body.password
    });
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function getAllUsers(req, res) {
  try {
    const data = await User.findAll();
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, data));
  }
}

async function getUserById(req, res) {
  try {
    const uid = req.query.userId;
    const data =  await User.findByPk(uid);
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function getUserByName(req, res) {
  try {
    const username = req.query.username;
    const data =  await User.findOne({
      where: {
        username: username
      }
    });
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function getUserWithRole(req, res) {
  try {
    const uid = req.query.userId;
    const data =  await User.findOne({
      where: {
        id: uid
      },
      include: [
        {
          model: Role,
          as: 'role'
        }
      ]
    });
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function deleteUser(req, res) {
  try {
    const uid = req.query.userId;
    const user = await User.findByPk(uid);
    await user.destroy();
    res.status(200).send(formatResult(null, "删除成功"));
  } catch(err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function updateUser(req, res) {
  try {
    const uid = req.body.userId;
    const user = await User.findByPk(uid);
    user.rolename = req.body.rolename;
    user.nickname = req.body.nickname;
    await user.save();
    res.status(200).send(formatResult(user));
  } catch(err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function setUserRole(req, res) {
  try {
    const userId = req.body.userId;
    const roleId = req.body.roleId;
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);
    const data = await user.addRole(role);
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

export default {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByName,
  setUserRole,
  getUserWithRole,
  login
};
