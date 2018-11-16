// pages/book-details/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        open1: false,
        open2: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 下拉菜单
    showitem1: function () {
        this.setData({
            open1: !this.data.open1
        })
    },
    hideitem1: function () {
        this.setData({
            open1: false
        })
    },
    showitem2: function () {
        this.setData({
            open2: !this.data.open2
        })
    },
    hideitem2: function () {
        this.setData({
            open2: false
        })
    },
    my_bag: function () {
        wx.navigateTo({
            url: '../school-bag/index'
        })
    }
})