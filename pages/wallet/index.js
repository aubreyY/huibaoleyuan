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
    depositMoney: "",
    paymentButton: false
  },
  onLoad() {
    if (app.globalData.userInfo.deposit == 0) {
      this.setData({
        paymentButton: true
      })
    }
    var depositMoney = formatMoney(app.globalData.configDict['deposit_grade']['1']);
    this.setData({
      depositMoney: depositMoney
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
      }),
      $api.user.deposit_withdraw().then(data => {
        if (data.errcode === 0) {
          console.log(data)
        } else {
          console.log(data)
        }
      })
  },
  onShow() {
    this.setData({
      userDeposit: formatMoney(app.globalData.userInfo.deposit)
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
          }, 1000)
          this.onShow();
          wx.navigateBack({
            delta: 1
          })
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
              title: "支付失败！",
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  _this.hideModal();
                }, 1000)
              }
            });
          });
        }
        wx.requestPayment(paymentConfig);
      } else {
        _this.setData({
          paymentFlag: false
        })
        wx.showToast({
          icon: 'none',
          title: "支付失败！",
          duration: 1000,
          success: function () {
            setTimeout(function () {
              _this.hideModal();
            }, 1000)
          }
        });
        console.log(data)
      }
    })
  }
})