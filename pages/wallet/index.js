var app = getApp();
import $api from '../../base/api'
import {
  formatMoney
} from "../../base/util";
Page({
  data: {
    userDeposit: "",
    paymentList: [],
    hideModal: true,
    animationData: {},
    paymentFlag: false,
    depositPaid:false,
    depositMoney: ""
  },
  onLoad() {
    if (!app.isLogined()) {
      wx.navigateTo({
        url: '../login/index?require_tel=true'
      })
    } else if (app.globalData.userInfo.tel == '') {
      wx.navigateTo({
        url: '../login/index?require_tel=true'
      })
    }
    var depositMoney = formatMoney(app.globalData.configDict['deposit_grade']['1']);
    this.setData({
      depositMoney: depositMoney
    })
  },
  onShow() {
    var userDeposit = formatMoney(app.globalData.userInfo.deposit);
    var depositPaid = userDeposit == this.data.depositMoney;
    this.setData({
      depositPaid: depositPaid,
      userDeposit: userDeposit
    })
    $api.user.payment_list().then(data => {
      if (data.errcode === 0) {
        var paymentList = data.data;
        paymentList.forEach(item => {
          item.moneyNum = formatMoney(item.money)
        });
        this.setData({
          paymentList: paymentList
        })
      } else {
        console.log(data)
      }
    })
  },
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();
    }, 300)
  },
  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation
    that.fadeDown();
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 300)
  },
  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  /**
   * 微信支付功能
   */
  wxpay: function () {
    if (this.data.paymentFlag) {
      return;
    }
    this.data.paymentFlag = true;
    var _this = this;
    $api.user.deposit_pay().then(data => {
      if (data.errcode === 0) {
        var paymentConfig = data.data.sign_data;
        // 成功
        paymentConfig.success = function (res) {
          _this.setData({
            paymentFlag: false
          })
          setTimeout(function () {
            _this.hideModal();
          }, 500)
        }
        // 失败
        paymentConfig.fail = function (res) {
          console.log(res)
          $api.user.deposit_cancel(data.data.paymentid).then(data => {
            _this.setData({
              paymentFlag: false
            })
            console.log(data)
            wx.showToast({
              icon: 'none',
              title: "押金支付失败！",
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  _this.hideModal();
                }, 500)
              }
            });
          });
        }
        // 完成返回
        paymentConfig.complete = function (res) {
          if (res.errMsg == 'requestPayment:ok') {
            app.reloadUserInfo(function(userInfo){
              console.log(userInfo)
              _this.onShow();
            });
            wx.showToast({
              icon: 'success',
              title: "押金支付成功",
              duration: 2000,
            });
          }
        }
        wx.requestPayment(paymentConfig);
      } else {
        _this.setData({
          paymentFlag: false
        })
        wx.showToast({
          icon: 'none',
          title: "押金支付失败！",
          duration: 1000,
          success: function () {
            setTimeout(function () {
              _this.hideModal();
            }, 500)
          }
        });
        console.log(data)
      }
    })
  },
  // 刷新
  onPullDownRefresh() {
    this.onLoad();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})