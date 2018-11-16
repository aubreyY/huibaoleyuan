var app = getApp();
import $api from "../../base/api";

import {
  shareConfig
} from "../../base/config";

Page({
  data: {
    // 轮播属性
    bannerInfo: {
      imgUrls: [
        "../../image/banner_img.png",
        "../../image/banner_img.png",
        "../../image/banner_img.png"
      ],
      indicatorDots: true,
      autoplay: true,
      vertical: false,
      interval: 6000,
      circular: true,
      beforeColor: "white",
      afterColor: "#3EDD8D"
    },
    // 导航属性
    navContent: {
      open1: false,
      open2: false,
      navFixed: false
    }

    // timelineList: [
    //   {
    //     timelineid: 10001,
    //     title:
    //       "童颜巨乳萌神妹妹衣裳半裸秀魔鬼身材童颜巨乳萌神妹妹衣裳半裸秀魔鬼身材童颜巨乳萌神妹妹衣裳半裸秀魔鬼身材",
    //     imglist: [
    //       "https://www.privacypic.com/images/2018/10/15/13b7500795176e3dd0.jpg",
    //       "https://www.touimg.com/u/20181016/23400073.jpg",
    //       "https://www.touimg.com/u/20181016/23400135.jpg",
    //       "https://www.touimg.com/u/20181016/23400275.jpg"
    //     ],
    //     stars: 1200
    //   },
    //   {
    //     timelineid: 10001,
    //     title:
    //       "童颜巨乳萌神妹妹衣裳半裸秀魔鬼身材童颜巨乳萌神妹妹衣裳半裸秀魔鬼身材童颜巨乳萌神妹妹衣裳半裸秀魔鬼身材",
    //     imglist: [
    //       "https://www.privacypic.com/images/2018/10/15/13b7500795176e3dd0.jpg",
    //       "https://www.touimg.com/u/20181016/23400073.jpg",
    //       "https://www.touimg.com/u/20181016/23400135.jpg",
    //       "https://www.touimg.com/u/20181016/23400275.jpg"
    //     ],
    //     stars: 1200
    //   }
    // ]
  },
  onLoad() {
    this.init(() => {});
  },
  onShareAppMessage() {
    return shareConfig();
  },

  // 刷新
  onPullDownRefresh: function () {
    this.init(() => {
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 500);
    });
  },
  init(callback) {
    this.setData({
      //timelineList: []
    });
  },
  //处理跳转
  my_bag: function () {
    wx.navigateTo({
      url: '../school-bag/index'
    })
  },
  my_map: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  my_lang:function(){
    wx.navigateTo({
      url:'../language-class/index'
    })
  },
  my_mood:function(){
    wx.navigateTo({
      url:'../mood-class/index'
    })
  },
  my_art:function(){
    wx.navigateTo({
      url:'../art-class/index'
    })
  },
  my_science:function(){
    wx.navigateTo({
      url:'../art-class/index'
    })
  },
  // 下拉菜单
  showitem1: function () {
    this.setData({
      open1: !this.data.open1
    })
  },
  hideitem1: function () {
    this.setData({
      open1: false
    })
  },
  showitem2: function () {
    this.setData({
      open2: !this.data.open2
    })
  },
  hideitem2: function () {
    this.setData({
      open2: false
    })
  },
  // 吸顶导航
  onPageScroll: function (e) {
    if (e.scrollTop >= 400 && !this.data.navFixed) {
      this.setData({
        navFixed: true
      })
      console.log(11111)
    } else if (e.scrollTop < 400 && this.data.navFixed) {
      this.setData({
        navFixed: false
      })
      console.log(22222)
    }
  }

})