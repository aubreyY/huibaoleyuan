// pages/book-details/index.js
const app = getApp()
Page({
  data: {

  },
  onReady: function () {
    this.popup = this.selectComponent(".popup");
  },

  showPopup() {
    this.popup.showPopup();
  },

  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  }
})