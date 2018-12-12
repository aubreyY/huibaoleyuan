var app = getApp();
import $api from "../../base/api";
import {
    shareConfig,
    IMG_URL
} from "../../base/config"
Page({
    data: {
        // 导航属性
        navAgeText: '年龄',
        navTypeText: '分类',
        navAgeValue: 0,
        navTypeValue: 0,
        navAgeShow: false,
        navTypeShow: false,
        navFixed: false,
        // btn标签
        bookbagAgeArray: app.globalData.configInfo.bookbag_age.items,
        bookbagTypeArray: app.globalData.configInfo.book_type.items,
    },
    onLoad: function (options) {
        var county = app.globalData.userLocation.adcode;
        $api.org.area_bookbag_list("", county, "", options.age, options.type, "").then(data => {
            if (data.errcode === 0) {
                var bookbagList = data.data.data;
                bookbagList.forEach(item => {
                    item.info.tags = JSON.parse(item.info.tags);
                    item.info.bookids = JSON.parse(item.info.bookids);
                    item.info.cover = IMG_URL + item.info.cover;
                });
                this.setData({
                    bookbagList: bookbagList
                })
            } else {
                console.log(data)
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
            $api.org.area_bookbag_list("", county, "", this.data.navAgeValue, this.data.navTypeValue).then(data => {
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
    showBookbagInfo: function (event) {
        var bagid = event.currentTarget.dataset.bagid;
        var orgid = event.currentTarget.dataset.orgid;
        wx.navigateTo({
            url: '../bookbag-org/index?bagid=' + bagid + '&orgid=' + orgid
        })
    }
})