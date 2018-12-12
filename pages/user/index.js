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
  // 扫一扫
  getScancode: function () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: "qrCode",
      success: (res) => {
        var codeUrl = res.result;
        // 截取链接中的参数
        if (codeUrl && codeUrl.indexOf("?") == -1) return {};
        var startIndex = codeUrl.indexOf("?") + 1;
        var str = codeUrl.substr(startIndex);
        var strs = str.split("&");
        var param = {}
        for (var i = 0; i < strs.length; i++) {
          var result = strs[i].split("=");
          var key = result[0];
          var value = result[1];
          param[key] = value;
        }
        wx.navigateTo({
          url: '../bookbag-org/index?orgid=' + param.orgid + '&bagid=' + param.bagid
        })
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
  bindPhone: function () {
    wx.navigateTo({
      url: '../login/index?require_tel=true'
    })
  }
});