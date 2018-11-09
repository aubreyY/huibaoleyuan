import { BASE_URL, UPLOAD_URL } from './config'
import { initPeerid, initSessionid } from './util';


var httpGet = (url, data, loading) => {
  if(loading){
    wx.showLoading({
      title: '加载中',
    })
  }
  data.peerid = initPeerid();
  data.sessionid = initSessionid();
  data._ts_ = (new Date()).getTime()

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: "get",
      data: data,
      dataType: "json",
      success(res) {
        if(loading){
          wx.hideLoading()
        } 
        if (res.data.errcode === 4101) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          wx.showToast({
            icon: 'none',
            title: "登录状态失效，重新登录",
            duration: 1000,
            success() {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/user/index'
                });
              }, 1000)
            }
          });
          return;
        }else{
          resolve(res.data);
        }
      },
      fail(res) {
        if(!loading){
          wx.hideLoading()
        }
        reject(res);
        wx.showToast({
          icon:"none",
          title: "error：" + res,
          duration: 1000,
        });
      },
    });
  });
}

var httpPost = (url, data, loading) => {
  if(loading){
    wx.showLoading({
      title: '加载中',
    })
  }
  console.log(data);
  data.peerid = initPeerid();
  data.sessionid = initSessionid();

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: "post",
      data: data,
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if(loading){
          wx.hideLoading()
        }
        resolve(res.data);
        if (res.data.errcode === 4101) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          wx.showToast({
            icon: 'none',
            title: "登录状态失效，重新登录",
            duration: 1000,
            success() {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/user/index'
                });
              }, 1000)
            }
          });
          return;
        }
      },
      fail(res) {
        if(!loading){
          wx.hideLoading()
        }
        reject(res);
        wx.showToast({
          icon:"none",
          title: "error：" + res,
          duration: 1000,
        });
      },
    });
  });
}

export default {
  common: {
    captcha() {
      return httpGet(BASE_URL + '/common/captcha')
    },
    login(code, data, iv) {
      return httpPost(BASE_URL + '/common/login', { code:code, data:data, iv:iv })
    },
    config_dict(checksum) {
      return httpGet(BASE_URL + '/common/config_dict', { checksum:checksum })
    },
    config_info(checksum) {
      return httpGet(BASE_URL + '/common/config_info', { checksum:checksum })
    },
    area_list({provinceid, cityid, townid}) {
      return httpGet(BASE_URL + '/common/area_list', {  })
    },
    msgcode(biztype, tel) {
      return httpGet(BASE_URL + '/common/msgcode', { biztype:biztype, tel:tel })
    },
    home_data(){
      return httpGet(BASE_URL + '/common/home_data', { })
    }
  },
  user : {
    info(){
      return httpGet(BASE_URL + '/user/info', { })
    },
  },

}