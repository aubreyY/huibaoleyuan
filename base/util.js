import {
  BAES_DONMAIN,
  BASE_URL,
  UPLOAD_URL,
  defaultUserCity,
  defaultConfigInfo,
  defaultConfigDict,
  defaultBookbagType
} from './config'
var QQMapWX = require('qqmap-wx-jssdk.js');

//生成Peerid   每个设备只生成一次，清除缓存重新生成
export var createPeerid = () => {
  let ts = (new Date()).getTime()
  let rn = Math.floor(Math.random() * 9) + 1;
  let mn = ts % rn
  let first = '3'
  return first + getRandomString(3, false, true) + rn + ts.toString(36) + mn + getRandomString(6, false, true);
};

export function getRandomString(len, onlyNumber, isLowercase) {
  len = len || 32;
  var chars = "0123456789abcdefghigklmnopqrstuvtxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
  var size = onlyNumber ? 10 : 62;
  var str = '';
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * size));
  }
  if (isLowercase) {
    str = str.toLowerCase();
  }
  return str;
}

//封装Promise 
//金钱格式
export var formatMoney = num => {
  if(num.length  == 0){
    return "0.00";
  }else if(num.length  == 1){
    return "0.0" + num;
  }if(num.length  == 2){
    return "0."+num;
  }
  return num.substring(0,num.length-2)+"."+num.substring(num.length-2);
};
// 随机数
export var getRandomNumber = (Min, Max) => {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range);
  return num;
};

export var initPeerid = () => {
  var peerid = wx.getStorageSync("peerid");
  if (!peerid) {
    peerid = createPeerid();
    wx.setStorageSync('peerid', peerid)
  }
  return peerid;
}


export var initSessionid = () => {
  var sessionid = wx.getStorageSync("sessionid");
  if (!sessionid) {
    sessionid = '';
  }
  return sessionid;
}

export var initConfigDict = () => {
  var configDict = wx.getStorageSync("configDict");
  if (!configDict) {
    configDict = defaultConfigDict;
  }
  return configDict;
}

export var initConfigInfo = () => {
  var configInfo = wx.getStorageSync("configInfo");
  if (!configInfo) {
    configInfo = defaultConfigInfo;
  }
  return configInfo;
}

export var initUserInfo = () => {
  var userInfo = wx.getStorageSync("userInfo");
  return userInfo;
};

export var initUserLocation = () => {
  var userLocation = wx.getStorageSync("userLocation");
  if (!userLocation) {
    userLocation = {};
  }
  return userLocation;
};

export var initComefrom = () => {
  var comefrom = wx.getStorageSync("comefrom");
  if (!comefrom) {
    comefrom = "";
  }
  return comefrom;
};

export var initMap = () => {
  // 实例化API核心类
  let map = new QQMapWX({
    key: 'BKGBZ-DQCC4-D4TUK-XIP6U-MVEBE-TNFWR'
  });
  return map;
};

export var initAreaDict = () => {
  var areaDict = wx.getStorageSync("areaDict");
  if (!areaDict) {
    areaDict = {};
  }
  return areaDict;
}

export var updateBookbagStat = (bookbag) => {
  var bookbagStat = wx.getStorageSync("bookbagStat");
  if (!bookbagStat) {
    bookbagStat = {
      bagid:{},
      type:{},
      age:{}
    };
  }
  if(bookbagStat.bagid[bookbag.bagid]){
    bookbagStat.bagid[bookbag.bagid] = bookbagStat.bagid[bookbag.bagid] + 1;
  }else{
    bookbagStat.bagid[bookbag.bagid] = 1;
  }
  if(bookbagStat.type[bookbag.type]){
    bookbagStat.type[bookbag.type] = bookbagStat.type[bookbag.type] + 1;
  }else{
    bookbagStat.type[bookbag.type] = 1;
  }
  if(bookbagStat.age[bookbag.age]){
    bookbagStat.age[bookbag.age] = bookbagStat.age[bookbag.age] + 1;
  }else{
    bookbagStat.age[bookbag.age] = 1;
  }
  wx.setStorageSync("bookbagStat", bookbagStat)
}

var  mapSort = (data, size) =>{
  let objKeyChange = {}
  let resultData = []
  let objVal = []
  let objKeys = Object.keys(data)
  
  if (!size) {
  size = objKeys.length
  }
  objKeys.map(e => {
  objKeyChange[data[e]] = e
  objVal.push(data[e])
  })
  
  objVal.sort((a, b) => {
  return b - a
  }).splice(0, size)
  .map(e => {
  resultData.push(objKeyChange[e])
  })
  return resultData
}

export var getBookbagStatTop = () => {
  var topData = {
    bagid:[],
    type:[],
    age:[]
  };
  var bookbagStat = wx.getStorageSync("bookbagStat");
  if (!bookbagStat) {
    return topData;
  }
  if(bookbagStat.bagid){
    topData.bagid = mapSort(bookbagStat.bagid, 5);
  }
  if(bookbagStat.type){
    topData.type = mapSort(bookbagStat.type, 2);
  }
  if(bookbagStat.age){
    topData.age = mapSort(bookbagStat.age, 2);
  }
  return topData;
}

export var getImgurl = (url) => {
  return `http://img${getRandomNumber(1, 3)}.${BAES_DONMAIN}/${url}`
}

export var animationMain = (param) => {
  this.
  param.dom = wx.createAnimation({
    duration: param.time || 500, // 以毫秒为单位  
    timingFunction: param.transition || 'ease',
    delay: param.delay || 0,
    transformOrigin: param.transformOrigin || '50% 50%'
  });
  // if (param.main) param.main(param.dom);
  // param.e.setData({
  //   [param.darm]: param.dom.export()
  // });
  // setTimeout(function () {
  //   if (param.callback) param.callback();
  // }.bind(param.e), param.time || 500);
  return param.dom;
}

