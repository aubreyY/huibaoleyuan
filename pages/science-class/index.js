Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 导航属性
        navCont: {
            open1: false,
            open2: false,
            iconHide1: false,
            iconHide2: false
        },
        ageText: '年龄',
        classText: '分类',
        // btn标签
        btnList: {
            btnArrey1: ['1~2岁', '2~3岁', '3~5岁', '5~6岁', '8岁以上', '全部'],
            btnArrey2: ['艺术创想', '儿童启蒙', '历史文学', '自我保护', '情感认知', '全部']
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 下拉菜单
    showitem1: function () {
        this.setData({
            open1: !this.data.open1,
            open2: false,
            iconHide1: !this.data.iconHide1,
            iconHide2: false,
            fontColor1: !this.data.fontColor1,
            fontColor2: false
        })
    },
    hideitem1: function (event) {
        var id = event.currentTarget.id;
        console.log(id)
        this.setData({
            open1: false,
            iconHide1: false,
            ageText: id,
            fontColor1: true
        })
    },
    showitem2: function () {
        this.setData({
            open2: !this.data.open2,
            open1: false,
            iconHide2: !this.data.iconHide2,
            iconHide1: false,
            fontColor2: !this.data.fontColor2,
            fontColor1: false
        })
    },
    hideitem2: function (event) {
        var id = event.currentTarget.id;
        this.setData({
            open2: false,
            iconHide2: false,
            classText: id,
            fontColor2: true
        })
    },
    my_bag: function () {
        wx.navigateTo({
            url: '../school-bag/index'
        })
    }
})