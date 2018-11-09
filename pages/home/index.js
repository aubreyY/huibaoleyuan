var app = getApp();
import $api from "../../base/api";

import { shareConfig } from "../../base/config";

Page({
  data: {
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
  onPullDownRefresh: function() {
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
  }
});