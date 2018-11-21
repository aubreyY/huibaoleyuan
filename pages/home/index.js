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
      iconHide1: false,
      iconHide2: false,
      fontColor1: false,
      fontColor2: false,
      navFixed: false
    },
    ageText: '年龄',
    classText: '分类',
    // btn标签
    btnList: {
      btnArrey1: ['1~2岁', '2~3岁', '3~5岁', '5~6岁', '8岁以上', '全部'],
      btnArrey2: ['艺术创想', '儿童启蒙', '历史文学', '自我保护', '情感认知', '全部']
    }
  },
  onLoad() {
    $api.bookbag.list(10).then(data => {
      if (data.errcode === 0) {
        console.log(data.data)
      } else {
        console.log(data.errinfo)
      }
    })
  },
  //处理页面跳转
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
  my_lang: function () {
    wx.navigateTo({
      url: '../language-class/index'
    })
  },
  my_mood: function () {
    wx.navigateTo({
      url: '../mood-class/index'
    })
  },
  my_art: function () {
    wx.navigateTo({
      url: '../art-class/index'
    })
  },
  my_science: function () {
    wx.navigateTo({
      url: '../science-class/index'
    })
  },
  // 下拉菜单
  showitem1: function () {
    this.setData({
      open1: !this.data.open1,
      open2: false,
      iconHide1: !this.data.iconHide1,
      iconHide2: false,
      fontColor1: !this.data.fontColor1,
      fontColor2: false
    })
  },
  hideitem1: function (event) {
    var id = event.currentTarget.id;
    console.log(id)
    this.setData({
      open1: false,
      iconHide1: false,
      ageText: id,
      fontColor1: true
    })
  },
  showitem2: function () {
    this.setData({
      open2: !this.data.open2,
      open1: false,
      iconHide2: !this.data.iconHide2,
      iconHide1: false,
      fontColor2: !this.data.fontColor2,
      fontColor1: false
    })
  },
  hideitem2: function (event) {
    var id = event.currentTarget.id;
    this.setData({
      open2: false,
      iconHide2: false,
      classText: id,
      fontColor2: true
    })
  },
  // 吸顶导航
  onPageScroll: function (e) {
    if (e.scrollTop >= 400 && !this.data.navFixed) {
      this.setData({
        navFixed: true
      })
    } else if (e.scrollTop < 400 && this.data.navFixed) {
      this.setData({
        navFixed: false
      })
    }
  }
})