var app = getApp();
import $api from '../../base/api'
Page({
    data: {
        agreedIcon: false,
        orgInfo: {},
        bagid: "",
        orderid: "",
        depositGrade: app.globalData.configDict.deposit_grade['1'],
        userLocation: app.globalData.userLocation
    },

    onLoad(options) {
        console.log(options)
        this.setData({
            orgid: options.orgid,
            bagid: options.bagid
        })
        // 服务机构网点内容
        $api.org.info(options.orgid).then(data => {
            if (data.errcode === 0) {
                this.setData({
                    orgInfo: data.data
                })
            } else {
                console.log(data)
            }
        })
    },
    // 同意条款
    changIcon: function () {
        this.setData({
            agreedIcon: !this.data.agreedIcon
        })
    },
    // 确认借阅
    confirmBorrow: function () {
        if (!app.isLogined()) {
            wx.navigateTo({
                url: '../login/index?require_tel=true'
            })
        } else if (app.globalData.userInfo.tel == '') {
            wx.navigateTo({
                url: '../login/index?require_tel=true'
            })
        } else if (!this.data.agreedIcon) {
            wx.showToast({
                icon: 'none',
                title: "请同意借阅条款！",
                duration: 1000
            })
        } else if (parseInt(app.globalData.userInfo.deposit) < parseInt(this.data.depositGrade)) {
            wx.showToast({
                icon: 'none',
                title: "支付全额押金才可以借阅哦！",
                duration: 1000,
                success: function () {
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '../wallet/index'
                        })
                    }, 1000)
                }
            })
        } else {
            $api.order.create(this.data.orgid, this.data.bagid).then(data => {
                if (data.errcode === 1) {
                    wx.showToast({
                        icon: 'none',
                        title: "您有未完成的订单，暂时无法借阅！",
                        duration: 3000
                    });
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: "借阅成功，请在三个工作日内取书！",
                        duration: 1000,
                        success: function () {
                            setTimeout(function () {
                                wx.switchTab({
                                    url: '../order/index'
                                })
                            }, 1000)
                        }
                    });
                }
            })
        }
    }
});