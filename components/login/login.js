// components/login/login.js
var app=getApp();

import $api from '../../base/api'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      console.log(e)
      if (e.detail.errMsg == "getUserInfo:ok") {
        $api.common.login().then(data => {
          if(data.errcode == 0){
            app.globalData.sessionid = data.data.sessionid;
            wx.setStorageSync("sessionid", data.data.sessionid)
            this.setData({
              isShow: false
            });
          }
        });

      }
    },
  }
})
