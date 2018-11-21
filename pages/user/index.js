var app = getApp();
import $api from "../../base/api";
import {
  shareConfig
} from "../../base/config"
Page({
  data: {
    userInfo: {
      avatarUrl: "",
      nickName: "",
      wallet: "我的钱包",
      borrowGuide: "借阅指南",
      userAbout: "关于我们",
      userTitle: "已经借阅3次啦!",
      registered:"点击登录/注册"
    },
  },
  onLoad() {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName
        })
      }
    })
  },
  //处理页面跳转
  my_login: function () {
    wx.navigateTo({
      url: '../login/index'
    })
  },
  my_wallet: function () {
    wx.navigateTo({
      url: '../wallet/index'
    })
  },
  my_guide: function () {
    wx.navigateTo({
      url: '../borrow-guide/index'
    })
  },
  my_about: function () {
    wx.navigateTo({
      url: '../about-us/index'
    })
  },
  my_settings: function () {
    wx.navigateTo({
      url: '../settings/index'
    })
  }
});