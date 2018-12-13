/* 环境切换 */
export const APP_TYPE = 'test'

let BAES_DOMAIN = APP_TYPE == 'test' ? 'test.huibaoleyuan.cn/' : 'wx.huibaoleyuan.com'

// let BASE_URL = 'https://app.'+BAES_DOMAIN
// let UPLOAD_URL = 'https://upload.'+BAES_DOMAIN
// let IMG_PRIVATE_URL = 'https://img.'+BAES_DOMAIN

let BASE_URL = 'https://wxapp.huibaoleyuan.com'
let UPLOAD_URL = 'https://upload.huibaoleyuan.com'
let IMG_URL = 'http://img.huibaoleyuan.com/'


// 生产环境
let QRCODE_URL = 'http://wx.huibaoleyuan.com'

// 测试环境
// let QRCODE_URL = 'http://wx.test.huibaoleyuan.cn'

let ORDER_NORMAL_DAYS = 30;

let shareConfig = (param) => {
    if (param == undefined) {
        param = {};
    }
    return {
        title: param.title || '慧宝乐园',
        desc: param.desc || '您身边的便捷儿童绘本租借平台!',
        imageUrl: param.img || "",
        path: param.path || '/pages/index/index',
        success(res) {
            if (param.success) param.success(res);
        },
        fail(res) {
            if (param.fail) param.fail(res);
        },
        complete(res) {
            if (param.complete) param.complete(res);
        }
    }
}

// 默认配置
let defaultConfigInfo = {
    "bookbag_age": {
        "name": "书包-年龄",
        "cfgid": "bookbag_age",
        "items": [{
            "itemid": "1",
            "name": "0~2岁"
        }, {
            "itemid": "2",
            "name": "3~6岁"
        }, {
            "itemid": "3",
            "name": "7~12岁"
        }]
    },
    "book_type": {
        "name": "书籍-分类",
        "cfgid": "book_type",
        "items": [{
            "itemid": "1",
            "name": "性格养成"
        }, {
            "itemid": "2",
            "name": "人际交往"
        }, {
            "itemid": "3",
            "name": "科普知识"
        }, {
            "itemid": "4",
            "name": "安全教育"
        }, {
            "itemid": "5",
            "name": "经典国学"
        }]
    },
    "deposit_grade": {
        "name": "押金等级",
        "cfgid": "deposit_grade",
        "items": [{
            "itemid": "1",
            "name": "19900"
        }]
    },
    "bookbag_type_icon": {
        "name": "分类图标",
        "cfgid": "bookbag_type_icon",
        "items": [{
            "itemid": "1",
            "name": "/image/classify_01.png"
        }, {
            "itemid": "2",
            "name": "/image/classify_02.png"
        }, {
            "itemid": "3",
            "name": "/image/classify_03.png"
        }, {
            "itemid": "4",
            "name": "/image/classify_04.png"
        }, {
            "itemid": "5",
            "name": "/image/classify_05.png"
        }]
    }
}

// 默认配置
let defaultConfigDict = {
    "bookbag_age": {
        "1": "0~2岁",
        "2": "3~6岁",
        "3": "7~12岁"
    },
    "book_type": {
        "1": "性格养成",
        "2": "人际交往",
        "3": "科普知识",
        "4": "安全教育",
        "5": "经典国学"
    },
    "deposit_grade": {
        "1": "19900"
    },
    "bookbag_type_icon": {
        "1": "/image/classify_01.png",
        "2": "/image/classify_02.png",
        "3": "/image/classify_03.png",
        "4": "/image/classify_04.png",
        "5": "/image/classify_05.png"
    }
}

export {
    BAES_DOMAIN,
    BASE_URL,
    UPLOAD_URL,
    IMG_URL,
    ORDER_NORMAL_DAYS,
    shareConfig,
    defaultConfigInfo,
    defaultConfigDict,
    QRCODE_URL
}