Page({
    data: {
        Height: 0,
        scale: 17,
        latitude: "",
        longitude: "",
    },
    onLoad: function () {
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
        })
        wx.getLocation({
            // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            type: 'gcj02',
            success: function (res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                })
            }
        })
    }
})