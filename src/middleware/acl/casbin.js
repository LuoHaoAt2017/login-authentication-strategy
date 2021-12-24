import path from 'path';
import { newEnforcer } from 'casbin';
import formatResult from '../../utils';
// todo: 登录验证通过后 将用户信息注入 req 中
export default async (req, res, next) => {
  const enforcer = await newEnforcer(
    path.resolve(__dirname, 'model.conf'),
    path.resolve(__dirname, 'policy.csv'),
  );
  const role = req.user ? req.user.role : 'guest';
  const { url, method } = req;
  // Enforce决定一个 “subject” 是否能够用 “action” 操作访问 “object” ，输入参数通常是: (sub, obj, act)
  // 在本案例中，访问实体 sub 是 role, 访问资源 obj 是 url，访问方法 act 是 method
  if (enforcer.enforce(role, url, method)) {
    return next();
  }
  res.status(500).send(formatResult(null, "没有权限访问"));
};
