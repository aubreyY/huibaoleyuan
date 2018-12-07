var app = getApp();

import $api from '../../base/api'

Page({
    data: {
        Height: 0,
        scale: 18,
        latitude: "",
        longitude: "",
        orgIfo: {},
        orgid: "",
        orgInfoDistance: ""
    },
    onLoad: function (options) {
        this.setData({
            orgid: options.orgid
        })
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                //设置map高度，根据当前设备宽高满屏显示
                that.setData({
                    view: {
                        Height: res.windowHeight
                    }
                })
            }
        });
        wx.getLocation({
            // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            type: 'gcj02',
            success: function (res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                })
            }
        });
        $api.org.info(this.data.orgid).then(data => {
            var _this = this;
            var coordinate = data.data.coordinate.split(",");
            if (coordinate.length > 1) {
                app.globalData.map.calculateDistance({
                    to: [{
                        longitude: parseFloat(coordinate[0]),
                        latitude: parseFloat(coordinate[1]),
                    }],
                    success: function (res) {
                        var orgInfoDistance = Math.floor(res.result.elements[0].distance / 1000 * 100) / 100;
                        _this.setData({
                            orgInfoDistance: orgInfoDistance
                        })
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                })
            } else {
                orgInfo.distance = 0;
            }
            this.setData({
                orgIfo: data.data,
            })
        });
    },
    // 拨打电话
    callMe: function () {
        $api.org.info(this.data.orgid).then(data => {
            var phoneNumber = data.data.tel
            wx.makePhoneCall({
                phoneNumber: phoneNumber
            })
        })
    },
    // 导航功能
    navGo: function () {
        $api.org.info(this.data.orgid).then(data => {
            console.log(data)
            var str = data.data.coordinate.split(",");
            var longitude = parseFloat(str[0]);
            var latitude = parseFloat(str[1]);
            var name = data.data.address
            wx.openLocation({
                longitude: longitude,
                latitude: latitude,
                name: name,
                scale: 18
            })
        })
    }
})