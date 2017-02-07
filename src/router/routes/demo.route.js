/**
 * Created by dreamapple on 16/9/27.
 */

'use strict';
let router = {
  // demo页面
  "/demo": {
    name: 'Demo',
    component: function (resolve) {
      require(['../../pages/_demo/demo.page'], resolve);
    }
  }
};

export default router;

