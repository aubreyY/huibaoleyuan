var app = getApp();
import $api from '../../base/api'
import {
  IMG_URL,
  ORDER_NORMAL_DAYS
} from "../../base/config";
import {
  getBookbagStatTop,
  formatMoney
} from "../../base/util";
import QRCode from "../../base/weapp-qrcode"
Page({
  data: {
    orderList: [],
    OrderStatus: {
      booking: "0",
      borrowing: "1",
      finished: "2"
    },
    FeesStatus: {
      ok: "0",
      nok: "1"
    },
    defaultBlank: false,
    qrCode: null,
    animationData: {},
    qrcodeModal: true,
    paymentFlag: false,
    deleteOrderFlag: false,
    qrcodeCanvasSize: 240,
    canvasImgSize: 240,
  },
  onLoad() {
    if (!app.isLogined()) {
      wx.navigateTo({
        url: '../login/index'
      })
    }
    this.setData({
      qrcodeCanvasSize: app.globalData.systemInfo.windowWidth / (750 / 320)
    })
  },
  onShow() {
    var ageDict = app.globalData.configDict['bookbag_age'];
    var typeDict = app.globalData.configDict['bookbag_type'];
    var bookbagStat = getBookbagStatTop();
    // 订单内容
    $api.order.list().then(data => {
      if (data.errcode === 0) {
        var orderList = data.data;
        orderList.forEach(item => {
          item.baginfo.tags = JSON.parse(item.baginfo.tags);
          item.baginfo.bookids = JSON.parse(item.baginfo.bookids);
          item.baginfo.bookNum = item.baginfo.bookids.length;
          item.baginfo.cover = IMG_URL + item.baginfo.cover;
          item.baginfo.ageText = ageDict[item.baginfo.age];
          item.baginfo.typeText = typeDict[item.baginfo.type];
          item.total_daysNum = parseInt(ORDER_NORMAL_DAYS) + parseInt(item.overdue_days);
          item.overdue_feesNum = formatMoney(item.overdue_fees);
          item.damaged_feesNum = formatMoney(item.damaged_fees);
          item.total_feesNum = formatMoney(item.total_fees);
        });
        if (data.data.length == 0) {
          this.setData({
            defaultBlank: false
          })
        }
        if (data.data.length > 0) {
          this.setData({
            defaultBlank: true
          })
        }
        this.setData({
          orderList: orderList
        })
      } else {
        console.log(data)
      }
    });
    // 猜你喜欢
    $api.bookbag.guess_list(app.globalData.userLocation.city, app.globalData.userLocation.county, bookbagStat.bagid, bookbagStat.age, bookbagStat.type).then(data => {
      if (data.errcode === 0) {
        var userLocation = app.globalData.userLocation;
        var areaDict = app.globalData.areaDict[userLocation.province];
        var guessBookbagList = data.data;
        guessBookbagList.forEach(item => {
          item.ageText = ageDict[item.age];
          item.typeText = typeDict[item.type];
          item.countyName = areaDict[item.county];
          item.townName = areaDict[item.town];
          item.info.cover = IMG_URL + item.info.cover;
        });

        this.setData({
          guessBookbagList: guessBookbagList
        })
        console.log(data)
      } else {
        console.log(data)
      }
    });
  },
  /**
   * 费用支付
   *  */
  feesPay: function (event) {
    if (this.data.paymentFlag) {
      return;
    }
    this.data.paymentFlag = true;
    var _this = this;
    var orderid = event.currentTarget.dataset.orderid;
    $api.order.fees_pay(orderid).then(data => {
      if (data.errcode === 0) {
        var paymentConfig = data.data.sign_data;
        // 成功
        paymentConfig.success = function (res) {
          _this.setData({
            paymentFlag: false
          })
          this.onShow()
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
              duration: 1000
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
          duration: 1000
        });
        console.log(data)
      }
    })
  },
  // 订单二维码
  showOrderQrcode: function (event) {
    this.showQrcodeModal();
    var orderid = event.currentTarget.dataset.orderid;
    var url = "http://wx.test.huibaoleyuan.cn/?orderid=" + orderid;
    if (!this.data.qrCode) {
      var qrCode = new QRCode('canvas-qrcode', {
        text: url,
        width: this.data.qrcodeCanvasSize,
        height: this.data.qrcodeCanvasSize,
        colorDark: "#3EDD8D",
        colorLight: "white",
        correctLevel: QRCode.CorrectLevel.H,
      });

      this.setData({
        qrCode: qrCode
      })
    } else {
      console.log(this.data.qrCode)
      // this.data.qrCode.clear();
      this.data.qrCode.makeCode(url);
    }
  },
  /**
   * 订单二维码弹窗
   *  */
  // 显示遮罩层
  showQrcodeModal: function () {
    var that = this;
    that.setData({
      qrcodeModal: false
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
  hideQrcodeModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 700,
      timingFunction: 'ease',
    })
    this.animation = animation
    that.fadeDown();
    setTimeout(function () {
      that.setData({
        qrcodeModal: true
      })
    }, 500)
    this.onShow();
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
  // 取消订单
  deleteOrder: function (event) {
    if (this.data.deleteOrderFlag) {
      return;
    }
    this.data.deleteOrderFlag = true;
    var _this = this;
    var orderid = event.currentTarget.dataset.orderid;
    $api.order.delete_order(orderid).then(data => {
      _this.setData({
        deleteOrderFlag: false
      })
      if (data.errcode === 0) {
        wx.showToast({
          icon: 'none',
          title: "取消成功",
          duration: 1000
        });
        this.onShow()
      } else {
        console.log(data)
      }
    })
  },
  //处理页面跳转
  borrowRecord: function () {
    if (!app.isLogined()) {
      wx.navigateTo({
        url: '../login/index'
      })
    } else {
      wx.navigateTo({
        url: '../borrow-record/index'
      })
    }
  },
  returnBook: function (event) {
    var orgid = event.currentTarget.dataset.orgid;
    console.log(orgid)
    wx.navigateTo({
      url: '../return-book/index?orgid=' + orgid
    })
  },
  showBookbagInfo: function (event) {
    var bagid = event.currentTarget.dataset.bagid;
    var orgid = event.currentTarget.dataset.orgid;
    wx.navigateTo({
      url: '../bookbag-org/index?bagid=' + bagid + '&orgid=' + orgid
    })
  },
  onPullDownRefresh() {
    this.onShow();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
});