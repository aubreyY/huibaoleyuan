var app = getApp();
import $api from '../../base/api'
import {
    IMG_URL
} from "../../base/config";
import {
    formatMoney
} from "../../base/util";
Page({
    data: {
        receordList: []
    },
    onLoad() {
        // 订单借阅记录
        $api.order.history_list().then(data => {
            if (data.errcode === 0) {
                var receordList = data.data;
                var ageDict = app.globalData.configDict['bookbag_age']
                var typeDict = app.globalData.configDict['bookbag_type']
                receordList.forEach(item => {
                    item.baginfo.tags = JSON.parse(item.baginfo.tags);
                    item.baginfo.bookids = JSON.parse(item.baginfo.bookids);
                    item.baginfo.bookNum = item.baginfo.bookids.length;
                    item.baginfo.cover = IMG_URL + item.baginfo.cover;
                    item.baginfo.ageText = ageDict[item.baginfo.age];
                    item.baginfo.typeText = typeDict[item.baginfo.type];
                    item.total_feesNum = formatMoney(item.total_fees);
                });
                this.setData({
                    receordList: receordList
                })

                console.log(data.data[0].status)
            } else {
                console.log(data)
            }
        })
    }
});