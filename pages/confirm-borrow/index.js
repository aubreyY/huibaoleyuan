var app = getApp();
import $api from '../../base/api'
Page({
    data: {

    },
    //事件处理函数
    my_confirm: function () {
        wx.navigateTo({
            url: '../confirm-borrow/index'
        })
    },

    onLoad(query) {


    },

    init(nextIndex, menu) {

    },

});