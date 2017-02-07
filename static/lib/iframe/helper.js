// lib
(function(window){
  'use strict';
  var START_PAY = 'game:recharge@popup'; // 开始支付的事件
  var PAY_COMPLETE = 'game:recharge@result'; // 支付完成的事件

  function GameHelper(options){
    // 外部的配置
    var _defaultConfig = {
      origin: '*'
    };
    var _config = options || _defaultConfig;
    var _gameHelper = {};

    // 通知外部窗口用户准备进行支付
    _gameHelper.postMessage = function(data) {
      var win = window.top;
      console.log(2);
      win.postMessage({
        action: START_PAY, // 字符串 通知外面的窗口调用支付弹窗
        gamePayInfo: data
      }, _config.origin);
    };

    // 返回gameHelper对象
    return _gameHelper;
  }

  // 接受外部的事件信息
  function listener(e) {
    // 根据消息的种类来决定不同的行为
    if(e.data.hasOwnProperty('action')) {
      switch (e.data.action) {
        // 弹出支付弹窗
        case PAY_COMPLETE:
          // TODO 游戏房确定支付的结果
          try {
            // 这个函数的名字要和外面的确认函数的名字一致
            window.confirmPayResult();
          }catch(e) {
            console.log(e);
          }
          break;
        default: break;
      }
    }
  }
  // 事件监听
  if (window.addEventListener) {
    addEventListener("message", listener, false)
  } else {
    attachEvent("onmessage", listener)
  }

  if(typeof(window.GameHelper) === 'undefined'){
    window.GameHelper = GameHelper;
  }
})(window);
