/* 环境切换 */
export const APP_TYPE = 'test'

let BAES_DOMAIN = APP_TYPE == 'test' ? '192.168.1.122:18850' : 'wx.huibaoleyuan.com'

// let BASE_URL = 'https://app.'+BAES_DOMAIN
// let UPLOAD_URL = 'https://upload.'+BAES_DOMAIN
// let IMG_PRIVATE_URL = 'https://img.'+BAES_DOMAIN


let BASE_URL = 'http://192.168.1.122:18850'
let UPLOAD_URL = 'http://192.168.1.122:18852'
let IMG_PRIVATE_URL = 'http://img.'+BAES_DOMAIN



export { BAES_DOMAIN, BASE_URL, UPLOAD_URL, IMG_PRIVATE_URL}

export var shareConfig = (param) => {
    if (param == undefined) {
        param = {};
    }
    return {
        title: param.title || '慧宝乐园',
        desc: param.desc || '您身边的便捷儿童绘本租借平台!',
        imageUrl: param.img || "",
        path: param.path || '/pages/index/index',
        success(res) {　　　　
            if(param.success) param.success(res);
        },
        fail(res) {　　
            if(param.fail) param.fail(res);
        },
        complete(res) {
            if(param.complete) param.complete(res);
        }
    }
}
