import { Role } from "../model/role";
import formatResult from "../utils/index";

async function createRole(req, res) {
  try {
    const data = await Role.create({
      rolename: req.body.rolename,
      nickname: req.body.nickname,
    });
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function getAllRoles(req, res) {
  try {
    const data = await Role.findAll();
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, data));
  }
}

async function getRoleById(req, res) {
  try {
    const uid = req.query.userId;
    const data =  await Role.findByPk(uid);
    res.status(200).send(formatResult(data));
  } catch (err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function deleteRole(req, res) {
  try {
    const uid = req.query.userId;
    const role = await Role.findByPk(uid);
    await role.destroy();
    res.status(200).send(formatResult(null, "删除成功"));
  } catch(err) {
    res.status(500).send(formatResult(null, err));
  }
}

async function updateRole(req, res) {
  try {
    const uid = req.body.userId;
    const role = await Role.findByPk(uid);
    role.rolename = req.body.rolename;
    role.nickname = req.body.nickname;
    await role.save();
    res.status(200).send(formatResult(role));
  } catch(err) {
    res.status(500).send(formatResult(null, err));
  }
}

export default {
  createRole,
  deleteRole,
  updateRole,
  getAllRoles,
  getRoleById,
};
