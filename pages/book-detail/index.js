var app = getApp();
import $api from "../../base/api";

import {
  shareConfig,
  IMG_URL
} from "../../base/config";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetailInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ageDict = app.globalData.configDict['bookbag_age']
    var typeDict = app.globalData.configDict['bookbag_type']
    // 书籍详情
    $api.bookbag.book_info(options.bookid).then(data => {
      if (data.errcode === 0) {
        var bookDetailInfo = data.data;
        bookDetailInfo.cover = IMG_URL + data.data.cover;
        bookDetailInfo.imglist = JSON.parse(data.data.imglist);
        bookDetailInfo.ageText = ageDict[bookDetailInfo.age];
        bookDetailInfo.typeText = typeDict[bookDetailInfo.type];
        bookDetailInfo.imglist.forEach((imgurl, index) => {
          bookDetailInfo.imglist[index] = IMG_URL + imgurl;
        });
        this.setData({
          bookDetailInfo: bookDetailInfo
        })
      } else {
        console.log(data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})