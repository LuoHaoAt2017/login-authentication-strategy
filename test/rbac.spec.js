const path = require('path');
const { newEnforcer } = require('casbin');

describe("rbac API 测试", function() {

  const model_path = path.resolve(__dirname, './rbac_model.conf');
  const policy_path = path.resolve(__dirname, './rbac_policy.csv');
  
  test("HasRoleForUser 确定用户是否具有角色。", async function() {
    const enforcer = await newEnforcer(model_path, policy_path);
    expect(await enforcer.hasRoleForUser('alice', 'data2_admin')).toBeTruthy();
  });

  test("AddRoleForUser 为用户添加角色", async function() {
    const enforcer = await newEnforcer(model_path, policy_path);
    await enforcer.addRoleForUser("alice", "data1_admin"); // 在内存中添加不会持久化到文件上
    expect(await enforcer.hasRoleForUser("alice", "data1_admin")).toBeTruthy();
  });
});