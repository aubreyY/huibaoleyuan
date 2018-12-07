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
      // userTitle: "已经借阅3次啦!",
      registered: "点击登录/注册"
    },
  },
  onShow() {
    // 用户信息
    $api.user.info().then(data => {
      if (data.errcode === 0) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        this.setData({
          [avatarUrl]: data.data.avatar,
          [nickName]: data.data.nickname
        })
        console.log(data.data)
      } else {
        console.log(data)
      }
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
        url: '../login/index'
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
  }
});