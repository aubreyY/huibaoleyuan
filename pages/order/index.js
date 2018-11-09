var app = getApp();
import $api from '../../base/api'
Page({
  data: {

  },
  timelineCacheData:[],
  timelineList:[],
  menuConfig:[],

  //事件处理函数
  my_borrow: function() {
    wx.navigateTo({
      url: '../borrow/index'
    })
  },
  my_return_book: function() {
    wx.navigateTo({
      url: '../return-book/index'
    })
  },

  onLoad(query) {

    
  },

  init(nextIndex, menu) {


      
    

  },

});