const path = require('path');
const { newEnforcer } = require('casbin');

describe("casbin API 测试", function() {

  const model_path = path.resolve(__dirname, '../src/config/rbac_model.conf');
  const policy_path = path.resolve(__dirname, '../src/config/rbac_with_hierarchy_policy.csv');
  
  test("角色测试 getRolesForUser", async function() {
    const enforcer = await newEnforcer(model_path, policy_path);
    expect(await enforcer.getRolesForUser('alice')).toEqual(['admin']);
    expect(await enforcer.getRolesForUser('admin')).toEqual(['data1_admin', 'data2_admin']);
  });

  test("获取当前策略中显示的 object 列表", async function() {
    // p={sub, obj, act}
    const enforcer = await newEnforcer(model_path, policy_path);
    const objects = await enforcer.getAllObjects();
    expect(objects).toEqual(['data1', 'data2']);
  });

  test("获取当前策略中显示的操作列表", async function() {
    // p={sub, obj, act}
    const enforcer = await newEnforcer(model_path, policy_path);
    const actions = await enforcer.getAllActions();
    expect(actions).toEqual(['read', 'write']);
  });

  test("获取策略中的所有授权规则", async function() {
    // p={sub, obj, act}
    const enforcer = await newEnforcer(model_path, policy_path);
    const policys = await enforcer.getPolicy();
    expect(policys.length).toEqual(6);
    expect(policys[0]).toEqual(['alice', 'data1', 'read']);
    expect(policys[5]).toEqual(['data2_admin', 'data2', 'write']);
  });
});