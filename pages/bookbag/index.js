var app = getApp();
import $api from '../../base/api'
import {
    shareConfig,
    IMG_URL
} from "../../base/config";
Page({
    data: {
        bookbagInfo: {},
        chooseAreaOrgModal: false,
        cityInfo: {
            id: '',
            name: '',
        },
        countyInfo: {
            id: '',
            name: '',
        },
        orgList: []
    },
    onLoad(options) {
        var userLocation = app.globalData.userLocation;
        var areaDict = app.globalData.areaDict[userLocation.province];
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
        // 服务网点机构列表
        this.getAreaOrgList();
        // 书包内容
        $api.bookbag.info(options.bagid).then(data => {
            if (data.errcode === 0) {
                var bookbagInfo = data.data;
                bookbagInfo.cover = IMG_URL + bookbagInfo.cover;
                bookbagInfo.imglist = JSON.parse(bookbagInfo.imglist);
                bookbagInfo.imglist.forEach((imgurl, index) => {
                    bookbagInfo.imglist[index] = IMG_URL + imgurl;
                });

                bookbagInfo.books.forEach(item => {
                    item.cover = IMG_URL + item.cover;
                });
                this.setData({
                    bookbagInfo: bookbagInfo,
                })
                app.updateBookbagStat(bookbagInfo);
                console.log(data)
            } else {
                console.log(data)
            }
        })
    },
    getAreaOrgList: function () {
        $api.org.area_list(this.data.cityInfo.id, this.data.countyInfo.id, "").then(data => {
            if (data.errcode === 0) {
                this.setData({
                    orgList: data.data
                })
            } else {
                console.log(data)
            }
        })
    },
    showAreaOrgModel: function (event) {
        this.setData({
            chooseAreaOrgModal: !this.data.chooseAreaOrgModal,
        })
    },
    //处理页面跳转
    showBookInfo: function (event) {
        var bookid = event.currentTarget.id;
        wx.navigateTo({
            url: '../book-detail/index?bookid=' + bookid
        })
    },
    confirmBorrow: function (event) {
        this.showAreaOrgModel();
        var orgid = event.currentTarget.dataset.orgid;
        if (!app.isLogined()) {
            wx.navigateTo({
                url: '../login/index?require_tel=true'
            })
        } else if (app.globalData.userInfo.tel == '') {
            wx.navigateTo({
                url: '../login/index?require_tel=true'
            })
        } else if (parseInt(app.globalData.userInfo.deposit) < parseInt(this.data.depositGrade)) {
            wx.showToast({
                icon: 'none',
                title: "支付全额押金才可以借阅哦！",
                duration: 1000,
                success: function () {
                    setTimeout(function () {
                        wx.switchTab({
                            url: '../wallet/index'
                        })
                    }, 2000)
                }
            })
        } else {
            wx.navigateTo({
                url: '../confirm-borrow/index?orgid=' + orgid + "&bagid=" + this.data.bookbagInfo.bagid
            })
        }
    }
});