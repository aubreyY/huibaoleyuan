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
    modalMsg: {
      type: String,
      value: ' ',
    }
  },
  /** 
   * 组件的初始数据 
   */
  data: {
    animationData: {}
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
    }
  }
})