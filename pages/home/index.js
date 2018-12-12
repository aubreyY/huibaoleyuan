import $api from "../../base/api";
import {
  shareConfig,
  IMG_URL,
} from "../../base/config";
var app = getApp();
Page({
  data: {
    bannerList: [],
    winHeight: "",
    // 轮播属性
    bannerInfo: {
      indicatorDots: true,
      autoplay: true,
      vertical: false,
      interval: 6000,
      circular: true,
      beforeColor: "white",
      afterColor: "#3EDD8D"
    },
    // 导航属性
    navAgeText: '年龄',
    navTypeText: '分类',
    navAgeValue: 0,
    navTypeValue: 0,
    navAgeShow: false,
    navTypeShow: false,
    navFixed: false,

    bookbagTypeIconMap: app.globalData.configDict.bookbag_type_icon,
    classifyAgeArray: app.globalData.configDict.bookbag_age,
    // btn标签
    bookbagAgeArray: app.globalData.configInfo.bookbag_age.items,
    bookbagTypeArray: app.globalData.configInfo.book_type.items,
    // 数据页
    pagenum: 1,
    // 列表内容
    bookbagList: [],
  },
  onLoad() {
    console.log(app.globalData.configInfo)
    var _this = this;
    // 轮播图
    $api.common.banner_list().then(data => {
      if (data.errcode === 0) {
        var bannerList = data.data;
        bannerList.forEach(item => {
          item.imgurl = IMG_URL + item.imgurl;
        });
        this.setData({
          bannerList: bannerList
        })
      } else {
        console.log(data)
      }
    })
    // 获取当前定位的经纬度
    wx.getLocation({
      type: 'gcj02',
      success: function (res1) {
        // 使用腾讯定位服务逆地理解析经纬度
        app.globalData.map.reverseGeocoder({
          location: res1,
          success: function (res2) {
            var userLocation = res2.result.ad_info;
            var county = userLocation.adcode;
            userLocation.county = county;
            userLocation.city = county.substring(0, 4);
            userLocation.province = county.substring(0, 2);
            var areaDict = app.globalData.areaDict[userLocation.province];
            if (!areaDict) {
              $api.common.area_dict(userLocation.province).then(data => {
                if (data.errcode === 0) {
                  areaDict = data.data;
                  app.setAreaDict(userLocation.province, areaDict);
                  if (_this.data.bookbagList.length > 0) {
                    var bookbagList = _this.data.bookbagList;
                    bookbagList.forEach(item => {
                      item.countyName = areaDict[item.county];
                      item.townName = areaDict[item.town];
                    });
                    _this.setData({
                      bookbagList: bookbagList
                    })
                  }
                }
              });
            }
            app.saveUserLocation(userLocation);
            $api.org.area_bookbag_list("", county, "", _this.data.navAgeValue, _this.data.navTypeValue, "").then(data => {
              if (data.errcode === 0) {
                var bookbagList = data.data.data;
                bookbagList.forEach(item => {
                  item.info.tags = JSON.parse(item.info.tags);
                  item.info.bookids = JSON.parse(item.info.bookids);
                  item.info.bookNum = item.info.bookids.length;
                  item.info.cover = IMG_URL + item.info.cover;
                  if (areaDict) {
                    item.countyName = areaDict[item.county];
                    item.townName = areaDict[item.town];
                  } else {
                    item.countyName = '';
                    item.townName = '';
                  }
                });
                _this.setData({
                  bookbagList: bookbagList
                })
              } else {
                console.log(data)
              }
            })
          },
          fail: function (res2) {
            console.log(res2);
          },
        });
      }
    })
  },
  // 下拉菜单
  showOptionBox: function (event) {
    var boxid = event.currentTarget.dataset.boxid;
    var ageShow = boxid == 'age' ? true : false;
    var typeShow = boxid == 'type' ? true : false;
    this.setData({
      navAgeShow: ageShow,
      navTypeShow: typeShow
    })
  },
  changeOption: function (event) {
    var boxid = event.currentTarget.dataset.boxid;
    var itemid = event.currentTarget.dataset.itemid;
    var name = event.currentTarget.dataset.itemname;
    var updateFlag = true;
    if (boxid == 'age') {
      if (!this.data.navAgeShow) {
        return;
      }
      console.log(this.data.navAgeValue, itemid)
      if (this.data.navAgeValue == itemid) {
        updateFlag = false;
      }
      this.setData({
        navAgeShow: false,
        navAgeText: name,
        navAgeValue: itemid
      });
    }
    if (boxid == 'type') {
      if (!this.data.navTypeShow) {
        return;
      }
      console.log(this.data.navTypeValue, itemid)
      if (this.data.navTypeValue == itemid) {
        updateFlag = false;
      }
      this.setData({
        navTypeShow: false,
        navTypeText: name,
        navTypeValue: itemid
      });
    }
    if (updateFlag) {
      var county = app.globalData.userLocation.adcode;
      var province = county.substring(0, 2);
      $api.org.area_bookbag_list("", county, "", this.data.navAgeValue, this.data.navTypeValue, "").then(data => {
        if (data.errcode === 0) {
          var bookbagList = data.data.data;
          bookbagList.forEach(item => {
            item.info.tags = JSON.parse(item.info.tags);
            item.info.bookids = JSON.parse(item.info.bookids);
            item.info.bookNum = item.info.bookids.length;
            item.info.cover = IMG_URL + item.info.cover;
            if (app.globalData.areaDict[province]) {
              item.countyName = app.globalData.areaDict[item.county];
              item.townName = app.globalData.areaDict[item.town];
            } else {
              item.countyName = '';
              item.townName = '';
            }
          });
          this.setData({
            bookbagList: bookbagList
          })
        } else {
          console.log(data)
        }
      })
    }
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
  },
  //处理页面跳转
  showBookbagInfo: function (event) {
    var bagid = event.currentTarget.dataset.bagid;
    var orgid = event.currentTarget.dataset.orgid;
    wx.navigateTo({
      url: '../bookbag-org/index?bagid=' + bagid + '&orgid=' + orgid
    })
  },
  showBookbagList: function (event) {
    var classifytypeid = event.currentTarget.dataset.classifytypeid;
    wx.navigateTo({
      url: '../bookbag-list/index?age=' + '&type=' + classifytypeid
    })
  },
  showBannerDetail: function (event) {
    var bannerid = event.currentTarget.dataset.bannerid;
    var bannertype = event.currentTarget.dataset.bannertype;
    var datas = event.currentTarget.dataset.datas;
    if ("2" == bannertype) { //bookbag
      wx.navigateTo({
        url: '../bookbag/index?bagid=' + datas
      })
    } else { //pageurl
      wx.navigateTo({
        url: '../webview/index?url=' + datas
      })
    }
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '您身边的便捷儿童绘本租借平台!',
      path: '/pages/home/index',
      imageUrl: '',
      success: function (res) {},
      fail: function (res) {
        console.log(res)
      }
    }
  }
})