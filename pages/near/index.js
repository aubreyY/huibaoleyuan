var app = getApp();

import $api from '../../base/api'
Page({
  data: {
    orgList: [],
    cityInfo: {
      id: '',
      name: '',
    },
    countyInfo: {
      id: '',
      name: '',
    },
    chooseCountyModal: false,
    locationCountyList: [],
    defaultBlank: false
  },
  onLoad() {
    var userLocation = app.globalData.userLocation;
    var areaDict = app.globalData.areaDict[userLocation.province];
    if (userLocation.city == "1101") {
      userLocation.city = "11"
    }
    this.setData({
      cityInfo: {
        id: userLocation.city,
        name: areaDict[userLocation.city],
      },
      countyInfo: {
        id: userLocation.county,
        name: areaDict[userLocation.county],
      }
    })

    // 服务机构网点列表
    this.getAreaOrgList();

    var _this = this;
    // 获取当前定位的经纬度
    wx.getLocation({
      type: 'gcj02',
      success: function (res1) {
        console.log(res1)
        // 使用腾讯定位服务逆地理解析经纬度
        app.globalData.map.reverseGeocoder({
          location: res1,
          success: function (res2) {
            var userLocation = res2.result.ad_info;
            var county = userLocation.adcode;
            userLocation.county = county;
            userLocation.city = county.substring(0, 4);
            userLocation.province = county.substring(0, 2);
            if (userLocation.city == "1101") {
              userLocation.city = "1100"
            }
            app.saveUserLocation(userLocation);
            // 使用城市ID查询区县
            app.globalData.map.getDistrictByCityId({
              id: userLocation.city + "00",
              // id:"110000",
              success: function (data) {
                _this.setData({
                  locationCountyList: data.result[0]
                })
              },
              fail: function (data) {
                console.log(data);
              }
            });
          },
          fail: function (res2) {
            console.log(res2);
          },
        });
      }
    })
  },
  getAreaOrgList: function () {
    var _this = this;
    $api.org.area_list(this.data.cityInfo.id, this.data.countyInfo.id, "").then(data => {
      if (data.errcode === 0) {
        var orgList = data.data;
        orgList.forEach(orgInfo => {
          var coordinate = orgInfo.coordinate.split(",");
          if (coordinate.length > 1) {
            app.globalData.map.calculateDistance({
              to: [{
                longitude: parseFloat(coordinate[0]),
                latitude: parseFloat(coordinate[1]),
              }],
              success: function (res) {
                orgInfo.distance = Math.floor(res.result.elements[0].distance / 1000 * 100) / 100;
                _this.setData({
                  orgList: orgList
                })
              },
              fail: function (res) {
                console.log(res);
              }
            })
          } else {
            orgInfo.distance = 0;
          }
        });
        if (data.data.length == 0) {
          this.setData({
            defaultBlank: false
          })
        }
        if (data.data.length > 0) {
          this.setData({
            defaultBlank: true
          })
        }
        this.setData({
          orgList: orgList
        })
      } else {
        console.log(data)
      }
    })
  },
  showCountyModel: function () {
    this.setData({
      chooseCountyModal: !this.data.chooseCountyModal,
    })
  },
  chooseCounty: function (event) {
    var county = event.currentTarget.dataset.countyid;
    if (county != this.data.countyInfo.id) {
      var userLocation = app.globalData.userLocation;
      var areaDict = app.globalData.areaDict[userLocation.province];
      this.setData({
        countyInfo: {
          id: county,
          name: areaDict[county],
        }
      })
      this.getAreaOrgList();
    }
  },
  //处理页面跳转
  showMap: function (event) {
    var orgid = event.currentTarget.dataset.orgid;
    wx.navigateTo({
      url: '../map/map?orgid=' + orgid
    })
  }
});