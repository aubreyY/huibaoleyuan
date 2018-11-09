var app = getApp();
import $api from "../../base/api";
import {shareConfig} from "../../base/config"
Page({
  data: {
    userInfo:{},
  },
  //事件处理函数
  my_wallet: function() {
    wx.navigateTo({
      url: '../wallet/index'
    })
  },
  onLoad() {

  },

  onShareAppMessage () {
    return shareConfig();
  },
  // 刷新
  onPullDownRefresh: function () {
    
  },
  // onShow(){
  //   if(!app.isLogined()){
  //     wx.navigateTo({
  //        url: '../login/index'
  //     })
  //   }
  // },
});