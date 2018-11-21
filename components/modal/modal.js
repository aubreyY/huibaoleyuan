var app = getApp();
Component({
  options: {
    multipleSlots: true
  },
  /** 
   * 组件的属性列表 
   */
  properties: {
    hideModal: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: '标题',
    },
    content: {
      type: String,
      value: '内容',
    },
    btnNO: {
      type: String,
      value: '取消'
    },
    btnOK: {
      type: String,
      value: '确定'
    }

  },
  /** 
   * 组件的初始数据 
   */
  data: {
    animationData: {},
    flag: true
  },
  /** 
   * 组件的方法列表 
   */
  methods: {
    // 显示遮罩层
    showModal: function () {
      var that = this;
      that.setData({
        hideModal: false
      })
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.animation = animation
      setTimeout(function () {
        that.fadeIn();
      }, 200)
    },
    // 隐藏遮罩层
    hideModal: function () {
      var that = this;
      var animation = wx.createAnimation({
        duration: 700,
        timingFunction: 'ease',
      })
      this.animation = animation
      that.fadeDown();
      setTimeout(function () {
        that.setData({
          hideModal: true
        })
      }, 700)
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
    //隐藏输入框弹窗
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示输入框弹窗
    showPopup() {
      this.setData({
        flag: !this.data.flag
      })
    },
    _error() {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success() {
      //触发成功回调
      this.triggerEvent("success");
    },
    /**
     * 微信支付功能
     */
    wxpay: function () {
      var code = app.code;
      wx.request({
        url: "XXXXXXXXX",
        data: {
          code: code
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          var data = res.data;
          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,
            success: function (res) {
              console.log(res+"支付成功！")
            },
            fail: function (res) {
              console.log(res+"支付失败！")
            }
          })
        }
      })
    }
  }
})