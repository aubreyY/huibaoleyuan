/* 环境切换 */
export const APP_TYPE = 'test'

let BAES_DOMAIN = APP_TYPE == 'test' ? 'test.huibaoleyuan.cn/' : 'wx.huibaoleyuan.com'

// let BASE_URL = 'https://app.'+BAES_DOMAIN
// let UPLOAD_URL = 'https://upload.'+BAES_DOMAIN
// let IMG_PRIVATE_URL = 'https://img.'+BAES_DOMAIN


let BASE_URL = 'https://wxapp.huibaoleyuan.com'
let UPLOAD_URL = 'https://upload.huibaoleyuan.com'
let IMG_URL = 'http://img.' + BAES_DOMAIN

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

let defaultConfigInfo = {"bookbag_age":{"name":"书包-年龄","cfgid":"bookbag_age","items":[{"itemid":"1","name":"0~2岁"},{"itemid":"2","name":"2~3岁"},{"itemid":"3","name":"3~5岁"},{"itemid":"4","name":"5~6岁"},{"itemid":"5","name":"8岁以上"}]},"book_type":{"name":"书籍-分类","cfgid":"book_type","items":[{"itemid":"3","name":"亲情"},{"itemid":"2","name":"爱心"},{"itemid":"1","name":"勇气"}]},"deposit_grade":{"name":"押金等级","cfgid":"deposit_grade","items":[{"itemid":"1","name":"19900"}]},"bookbag_type_icon":{"name":"分类图标","cfgid":"bookbag_type_icon","items":[{"itemid":"1","name":"/image/classify_01.png"},{"itemid":"2","name":"/image/classify_02.png"},{"itemid":"3","name":"/image/classify_03.png"},{"itemid":"4","name":"/image/classify_04.png"},{"itemid":"5","name":"/image/classify_05.png"}]},"checksum":"b76b535adb203112bf933d80c9132fe5","bookbag_type":{"name":"书包-分类","cfgid":"bookbag_type","items":[{"itemid":"1","name":"性格养成"},{"itemid":"2","name":"情绪管理"},{"itemid":"3","name":"语言发展"},{"itemid":"4","name":"科普认知"},{"itemid":"5","name":"艺术创想"}]}}

let defaultConfigDict = {"bookbag_age":{"1":"0~2岁","2":"2~3岁","3":"3~5岁","4":"5~6岁","5":"8岁以上"},"book_type":{"1":"勇气","2":"爱心","3":"亲情"},"deposit_grade":{"1":"19900"},"bookbag_type_icon":{"1":"/image/classify_01.png","2":"/image/classify_02.png","3":"/image/classify_03.png","4":"/image/classify_04.png","5":"/image/classify_05.png"},"checksum":"013d6bbf7063839f9224787fb340b6d6","bookbag_type":{"1":"性格养成","2":"情绪管理","3":"语言发展","4":"科普认知","5":"艺术创想"}}

export {
    BAES_DOMAIN,
    BASE_URL,
    UPLOAD_URL,
    IMG_URL,
    ORDER_NORMAL_DAYS,
    shareConfig,
    defaultConfigInfo,
    defaultConfigDict,
}