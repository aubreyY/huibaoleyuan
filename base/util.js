import {
  BAES_DONMAIN, BASE_URL, UPLOAD_URL
} from './config'


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
  var wnux = "";
  num = num.toFixed(2);
  num = parseFloat(num);
  if (!num.toString().split(".")[1]) {
    wnux = ".00";
  }
  num = num.toLocaleString();
  return num + wnux; //返回的是字符串23,245.12保留2位小数
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
  return configDict;
}

export var initConfigInfo = () => {
  var configInfo = wx.getStorageSync("configInfo");
  return configInfo;
}

export var initUserInfo = () => {
  var userInfo = wx.getStorageSync("userInfo");
  return userInfo;
};

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



