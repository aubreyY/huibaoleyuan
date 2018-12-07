var app = getApp();
import $api from '../../base/api'
Page({
    data: {
        orgInfo: {}
    },
    onLoad(options) {
        console.log(options)
        // 服务机构网点内容
        $api.org.info(options.orgid).then(data => {
            if (data.errcode === 0) {
                console.log(data.data)
                this.setData({
                    orgInfo: data.data
                })
            } else {
                console.log(data)
            }
        })
    },
    //事件处理函数
    mapNav: function (event) {
        var orgid = event.currentTarget.dataset.orgid;
        wx.navigateTo({
            url: '../map/map?orgid=' + orgid
        })
    }
});