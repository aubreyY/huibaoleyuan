var app = getApp();
import $api from "../../base/api";
import {
  shareConfig
} from "../../base/config"
Page({
  data: {
    userInfo: {},
    isLogined: null
  },
  onShow() {
    this.setData({ 
      userInfo: app.globalData.userInfo,
      isLogined: app.isLogined()
    })
  },
  //处理页面跳转
  userLogin: function () {
    wx.navigateTo({
      url: '../login/index'
    })
  },
  userWallet: function () {
    if (!app.isLogined()) {
      wx.navigateTo({
        url: '../login/index?require_tel=true'
      })
    } else if (app.globalData.userInfo.tel == '') {
      wx.navigateTo({
        url: '../login/index?require_tel=true'
      })
    } else {
      wx.navigateTo({
        url: '../wallet/index'
      })
    }
  },
  borrowGuide: function () {
    wx.navigateTo({
      url: '../borrow-guide/index'
    })
  },
  about: function () {
    wx.navigateTo({
      url: '../about-us/index'
    })
  },
  userSettings: function () {
    wx.navigateTo({
      url: '../settings/index'
    })
  },
  bindPhone: function () {
    wx.navigateTo({
      url: '../login/index?require_tel=true'
    })
  }
});