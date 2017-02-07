'use strict';

import moment from 'moment/moment';
import Timeago from 'timeago.js';

// 字符串的截取
export const substr = function(value, length, modifier) {
  var output,innerModifier;
  innerModifier = modifier || '';
  output = value + '';
  if(output.length > length) {
    output = output.substring(0, length);
    output += innerModifier
  }
  return output
};

// 日期转换
export const formatDate = function(value, style) {
  var innerValue;
  innerValue = +(value || 0);
  if(isNaN(innerValue)){
    return value;
  }
  return moment(new Date(innerValue * 1000)).format(style);
};

// 字符串的截取,向前截取
export const foreSubstr = function(value, length, modifier) {
  var output,innerModifier,len;
  innerModifier = modifier || '';
  output = value + '';
  len = output.length;
  if(len > length) {
    output = output.substring(len - length, len);
    output = innerModifier + output;
  }
  return output
};

// 字符串的截取（指定字符数）
export const substrByChar = function(value, limit, modifier, dir = 1) {
  if(!value){
    return '';
  }
  let len = 0;
  for (var i = 0; i < value.length; i++) {
    let length = value.charCodeAt(i);
    if (length >= 0 && length <= 128) {
      len += 1;
    } else {
      len += 2;
    }
    if(len > limit){
      break;
    }
  }
  if(dir == 1){
    return value.substring(0, i) + modifier;
  }
  return modifier + value.substring(0, i);
};

/**
 * formatDateToTimeago 日期转换：将datetime时间转化成类似于***的时间描述字符串
 * @param  {string} value: datetime
 * @return {string} 刚刚/12秒前/3分钟前/2小时前/4天前/3周前/6月前/3年前 or 12秒后/3分钟后/2小时后/24天后/6月后/3年后
 */
export const formatDateToTimeago = function(value) {
  if(value == '') return '';
  return new Timeago().format(value, 'zh_CN');
};

// 格式化金币
export const moneyWidthComma = function(money, len) {
  // 如果数字小于1,直接返回
  if(money < 1) {
    return money;
  }
  let flag = +len || 3;
  let str = '' + money;
  let str2 = str.split('').reverse().join('');
  let arr = [];
  let n = str2.length;
  for(let i = 0; i < n; i++) {
    if(0 === (i + 1) % flag && i < (n - 1)) {
      arr[i] = ',' + str2[i];
    }
    else {
      arr[i] = str2[i];
    }
  }
  return arr.reverse().join('');
};
//计算时间差值
export const  timedata = function (value) {
//计算出相差天数
  var days=Math.floor(value/(24*3600*1000));
//计算出小时数
  var leave1=value%(24*3600*1000); //计算天数后剩余的毫秒数
  var hours=Math.floor(leave1/(3600*1000));
  if (hours<10){
    hours = "0" + hours;
  }
//计算相差分钟数
  var leave2=leave1%(3600*1000);       //计算小时数后剩余的毫秒数
  var minutes=Math.floor(leave2/(60*1000));
//计算相差秒数
  var leave3=leave2%(60*1000);   //计算分钟数后剩余的毫秒数
  var seconds=Math.round(leave3/1000);
  return hours+":"+minutes+":"+seconds;
};
//数据截取
export const  listasub = function (value,len) {
  value = value.slice(0, len);
  return value;
};

// 字符串的截取2
export const substr2 = function(value, length, modifier) {
  var output,innerModifier;
  innerModifier = modifier || '';
  output = value + '';
  if(output.length > length) {
    output = output.substring(0, (length - innerModifier.length));
    output += innerModifier
  }
  return output
};

//数据截取
export const  listCut = function (value,len) {
  let arr = value || [];
  let result = [];
  result = arr.slice(0, len);
  return result;
};
