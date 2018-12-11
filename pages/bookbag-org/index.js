var app = getApp();
import $api from '../../base/api'
import {
    shareConfig,
    IMG_URL
} from "../../base/config";
Page({
    data: {
        bookbagInfo: {}
    },
    onLoad(options) {
        // 书包内容
        $api.org.bookbag_info(options.orgid, options.bagid).then(data => {
            if (data.errcode === 0) {
                var bookbagInfo = data.data;
                bookbagInfo.info.cover = IMG_URL + bookbagInfo.info.cover;
                bookbagInfo.info.imglist = JSON.parse(bookbagInfo.info.imglist);
                bookbagInfo.info.imglist.forEach((imgurl, index) => {
                    bookbagInfo.info.imglist[index] = IMG_URL + imgurl;
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
    //处理页面跳转
    showBookInfo: function (event) {
        var bookid = event.currentTarget.id;
        wx.navigateTo({
            url: '../book-detail/index?bookid=' + bookid
        })
    },
    confirmBorrow: function (event) {
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
                url: '../confirm-borrow/index?orgid=' + this.data.bookbagInfo.orgid + "&bagid=" + this.data.bookbagInfo.bagid
            })
        }
    }
});