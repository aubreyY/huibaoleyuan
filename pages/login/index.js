var app = getApp();
import $api from "../../base/api";
Page({
  data: {
    // 微信授权登录
    requireTel: false,
    targetUrl: null,
    loginFlag: false,
    notLogined: true,
    notBound: false,
    // 绑定手机号
    tel: '',
    msgcode: '',
    comefrom: '',
    msgcodeText: '请获取验证码',
    msgcodeDisabled: false,
    submitDisabled: false
  },
  onLoad(options) {
    if (app.isLogined()) {
      this.setData({
        notLogined: false
      })
      if (options.require_tel) {
        this.setData({
          requireTel: true
        })
        if (app.globalData.userInfo.tel) {
          wx.navigateBack({
            delta: 1
          })
          return;
        } else {
          this.setData({
            notBound: true
          })
        }
      } else {
        wx.navigateBack({
          delta: 1
        })
        return;
      }
    } else {
      if (options.require_tel) {
        this.setData({
          requireTel: true
        })
      }
    }

    if (options.target_url) {
      this.setData({
        targetUrl: options.target_url
      })
    }
  },
  /**
   * 微信授权登录
   * **/
  authToLogin: function (e) {
    if (this.data.loginFlag) {
      return;
    }
    this.setData({
      loginFlag: true
    })
    var _this = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.login({
        success: function (res2) {
          if (res2.code) {
            wx.getUserInfo({
              success: function (res3) {
                $api.common.login(res2.code, res3.encryptedData, res3.iv).then(data => {
                  if (data.errcode === 0) {

                    app.saveSessionid(data.data.sessionid);
                    app.saveUserInfo(data.data.userinfo);
                    _this.setData({
                      notLogined: false
                    })
                    wx.showToast({
                      icon: 'none',
                      title: "授权登录成功",
                      duration: 2000
                    });
                    if (_this.data.requireTel) {
                      if (data.data.userinfo.tel) {
                        wx.navigateBack({
                          delta: 1
                        })
                      } else {
                        _this.setData({
                          notBound: true
                        })
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    } else {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                    console.log(_this.data);
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: "登录失败",
                      duration: 2000,
                    });
                    console.log(data);
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
  /**
   * 绑定手机号
   * **/
  // 获取输入的手机号和验证码
  getPhoneValue: function (event) {
    this.setData({
      tel: event.detail.value
    })
  },
  getCodeValue: function (event) {
    this.setData({
      msgcode: event.detail.value
    })
  },
  // 获取短信验证码
  getMsgcode: function () {
    if (this.data.msgcodeDisabled) {
      return;
    }
    var _this = this;
    if (this.data.tel == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!/^1\d{10}$/.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    this.setData({
      msgcodeDisabled: true
    })

    var msgcodeSeconds = 90;
    var msgcodeTimer = setInterval(function () {
      msgcodeSeconds--;
      if (msgcodeSeconds <= 0) {
        clearInterval(msgcodeTimer);
        msgcodeTimer = null;
        _this.setData({
          msgcodeText: '重新发送',
          msgcodeDisabled: false
        })
      } else {
        _this.setData({
          msgcodeText: msgcodeSeconds + "s",
          msgcodeDisabled: true
        })
      }
    }, 1000);
    $api.common.msgcode("bind", this.data.tel).then(data => {
      if (data.errcode === 0) {
        console.log(data)
        wx.showToast({
          title: '验证码已发送',
          icon: 'none',
          duration: 1000
        })
      } else if (data.errcode === 4108) {
        wx.showToast({
          title: '账户已存在',
          icon: 'none',
          duration: 1000,
          success: function () {
            clearInterval(msgcodeTimer);
            msgcodeTimer = null;
            _this.setData({
              msgcodeText: '请获取验证码',
              msgcodeDisabled: false
            })
          }
        })
      } else {
        wx.showToast({
          title: '请稍后再试',
          icon: 'none',
          duration: 1000,
          success: function () {
            clearInterval(msgcodeTimer);
            msgcodeTimer = null;
            _this.setData({
              msgcodeText: '重新发送',
              msgcodeDisabled: false
            })
          }
        })
        console.log(data)
      }
    })
  },
  //提交表单信息
  submitForm: function () {
    var _this = this;
    if (this.data.submitDisabled) {
      return;
    }
    if (this.data.tel == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!/^1\d{10}$/.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.msgcode == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!this.data.msgcode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    _this.setData({
      submitDisabled: true
    })
    $api.user.tel_bind(this.data.tel, this.data.msgcode).then(data => {
      if (data.errcode === 0) {
        console.log(data)
        wx.showToast({
          title: '绑定成功',
          icon: 'none',
          duration: 1000,
          success: function () {
            app.saveUserInfo(data.data);
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        console.log(data)
        wx.showToast({
          title: '绑定失败，请90秒后再试',
          icon: 'none',
          duration: 1000
        })
        _this.setData({
          submitDisabled: false
        })
      }
    })
  },
  onShow() {

  },
});