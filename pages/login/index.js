var app = getApp();
import $api from "../../base/api";
Page({
  data: {
    logintit: "推荐方式登录",
    wxfont: "微信授权登录",
    phonefont: "手机快捷登录"
  },
  // 登录
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.login({
        success: function (res2) {
          // console.log(res2)
          if (res2.code) {
            wx.getUserInfo({
              success: function (res3) {
                // console.log(res3)
                $api.common.login(res2.code, res3.encryptedData, res3.iv).then(data => {
                  if (data.errcode === 0) {
                    console.log(data);
                    app.saveSessionid(data.data.sessionid);
                    app.saveUserInfo(JSON.parse(res3.rawData));
                    wx.showToast({
                      icon: 'success',
                      title: "登录成功",
                      duration: 2000,
                      success: function () {
                        // console.log("showToast");
                        // 返回页面并刷新
                        wx.switchTab({
                          url: '../user/index',
                          success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                          }
                        })
                      }
                    });
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: "登录失败",
                      duration: 2000,
                    });
                  }
                })
              },
              fail(err) {
                wx.showToast({
                  icon: 'none',
                  title: "登录失败",
                  duration: 2000,
                });
              }
            });
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail(err) {
          wx.showToast({
            icon: 'none',
            title: err,
            duration: 2000,
          });
        }
      });
    } else {
      //用户按了拒绝授权按钮
      wx.showModal({
        title: '温馨提示',
        content: '您点击了拒绝授权，将无法使用小程序部分功能！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  onShow() {

  },
});