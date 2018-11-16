var app = getApp();
import $api from '../../base/api'
Page({
    data: {

    },
    //事件处理函数
    my_books: function () {
        wx.navigateTo({
            url: '../book-details/index'
        })
    },
    my_confirm: function () {
        wx.navigateTo({
            url: '../confirm-borrow/index'
        })
    },
    onReady: function () {
        //获得my_modal组件
        this.my_modal = this.selectComponent(".my_modal")
    },
    showModal: function () {
        this.my_modal.showModal()
    },
    prompt_hide: function () {
        this.my_modal.prompt_hide()
    },



    onLoad(query) {


    },

    init(nextIndex, menu) {

    },

});