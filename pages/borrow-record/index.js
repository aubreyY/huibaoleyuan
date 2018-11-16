var app = getApp();
import $api from '../../base/api'
Page({
    data: {

    },
    timelineCacheData: [],
    timelineList: [],
    menuConfig: [],

    //事件处理函数
    my_map: function () {
        wx.navigateTo({
            url: '../map/map'
        })
    },

    onLoad(query) {


    },

    init(nextIndex, menu) {

    },

});