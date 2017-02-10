import _test from './routes/demo.route';
import common from './common/common.route';

let route = {};

// 测试使用
Object.assign(route, _test);
Object.assign(route, common);
// 导出路由
exports.route = route;
