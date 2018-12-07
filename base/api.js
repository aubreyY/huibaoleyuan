import {
  BASE_URL,
  UPLOAD_URL
} from './config'
import {
  initPeerid,
  initSessionid,
  initUserLocation,
  initComefrom
} from './util';

var httpGet = (url, data, loading) => {
  if (loading) {
    wx.showLoading({
      title: '加载中',
    })
  }
  data.peerid = initPeerid();
  data.sessionid = initSessionid();
  data._ts_ = (new Date()).getTime()

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: "get",
      data: data,
      dataType: "json",
      success(res) {
        console.log(url, data, res)
        if (loading) {
          wx.hideLoading()
        }
        if (res.data.errcode === 4101) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          return;
        } else {
          resolve(res.data);
        }

      },
      fail(res) {
        if (!loading) {
          wx.hideLoading()
        }
        reject(res);
        wx.showToast({
          icon: "none",
          title: "error：" + res,
          duration: 1000,
        });
      },
    });
  });
}

var httpPost = (url, data, loading) => {
  if (loading) {
    wx.showLoading({
      title: '加载中',
    })
  }
  data.peerid = initPeerid();
  data.sessionid = initSessionid();
  data.comefrom = initComefrom();
  var userLocation = initUserLocation();
  data.xekdiensdnloc = userLocation.location ? userLocation.location : "";

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: "post",
      data: data,
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(url, data, res)
        if (loading) {
          wx.hideLoading()
        }
        resolve(res.data);
        if (res.data.errcode === 4101) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          return;
        }
      },
      fail(res) {
        if (!loading) {
          wx.hideLoading()
        }
        reject(res);
        wx.showToast({
          icon: "none",
          title: "error：" + res,
          duration: 1000,
        });
      },
    });
  });
}

export default {
  // 书包类
  bookbag: {
    // 所有书籍内容
    book_info(bookid) {
      return httpGet(BASE_URL + '/bookbag/book_info', {
        bookid: bookid
      })
    },
    // 所有书包内容
    info(bagid) {
      return httpGet(BASE_URL + '/bookbag/info', {
        bagid: bagid
      })
    },
    // 所有书包列表
    list(pagenum) {
      return httpGet(BASE_URL + '/bookbag/list', {
        pagenum: pagenum
      })
    },
    // 猜你喜欢
    guess_list(city, county, bagids, ages, types) {
      return httpGet(BASE_URL + '/bookbag/guess_list', {
        city: city,
        county: county,
        bagids: bagids,
        ages: ages,
        types: types
      })
    }
  },
  // 通用类
  common: {
    // 轮播图
    banner_list() {
      return httpGet(BASE_URL + '/common/banner_list', {})
    },
    // 区域列表
    area_dict(province, ) {
      return httpGet(BASE_URL + '/common/area_dict', {
        province: province
      })
    },
    // 城市列表
    area_list() {
      return httpGet(BASE_URL + '/common/area_list', {})
    },
    captcha() {
      return httpGet(BASE_URL + '/common/captcha', {})
    },
    // 字典翻译
    config_dict(checksum, ) {
      return httpGet(BASE_URL + '/common/config_dict', {
        checksum: checksum
      })
    },
    // 翻译内容
    config_info(checksum, ) {
      return httpGet(BASE_URL + '/common/config_info', {
        checksum: checksum
      })
    },
    // 登录
    login(code, data, iv, ) {
      return httpPost(BASE_URL + '/common/login', {
        code: code,
        data: data,
        iv: iv
      })
    },
    msgcode(biztype, tel) {
      return httpPost(BASE_URL + '/common/msgcode', {
        biztype: biztype,
        tel: tel
      })
    }
  },
  // 订单类
  order: {
    // 创建订单
    create(orgid, bagid, ) {
      return httpPost(BASE_URL + '/order/create', {
        orgid: orgid,
        bagid: bagid
      })
    },
    // 取消订单
    delete_order(orderid, ) {
      return httpPost(BASE_URL + '/order/delete', {
        orderid: orderid
      })
    },
    // 订单内容
    info(orderid, ) {
      return httpGet(BASE_URL + '/order/info', {
        orderid: orderid
      })
    },
    // 订单列表
    list() {
      return httpGet(BASE_URL + '/order/list', {})
    },
    // 费用支付
    fees_pay(orderid) {
      return httpPost(BASE_URL + '/order/fees_pay', {
        orderid: orderid
      })
    },
    // 历史订单
    history_list() {
      return httpGet(BASE_URL + '/order/history_list', {})
    }
  },
  // 机构类
  org: {
    // 服务机构网点列表
    area_list(city, county, town, ) {
      return httpGet(BASE_URL + '/org/area_list', {
        city: city,
        county: county,
        town: town
      })
    },
    // 当前机构位置书包列表
    area_bookbag_list(city, county, town, age, type, pagenum, ) {
      return httpGet(BASE_URL + '/org/area_bookbag_list', {
        city: city,
        county: county,
        town: town,
        age: age,
        type: type,
        pagenum: pagenum
      })
    },
    // 当前机构位置书包内容
    bookbag_info(orgid, bagid, ) {
      return httpGet(BASE_URL + '/org/bookbag_info', {
        orgid: orgid,
        bagid: bagid
      })
    },
    //  机构书包列表
    bookbag_list(orgid, pagenum, ) {
      return httpGet(BASE_URL + '/org/bookbag_list', {
        orgid: orgid,
        pagenum: pagenum
      })
    },
    // 服务机构网点内容
    info(orgid, ) {
      return httpGet(BASE_URL + '/org/info', {
        orgid: orgid
      })
    },
    order_delete(orderid, ) {
      return httpPost(BASE_URL + '/org/order_delete', {
        orderid: orderid
      })
    },
    order_finish(orderid, reparation, remake, ) {
      return httpPost(BASE_URL + '/org/order_finish', {
        orderid: orderid,
        reparation: reparation,
        remake: remake
      })
    },
    order_info(orderid, ) {
      return httpGet(BASE_URL + '/org/order_info', {
        orderid: orderid
      })
    },
    order_list() {
      return httpGet(BASE_URL + '/org/order_list', {})
    },
    order_loan(orderid, ) {
      return httpPost(BASE_URL + '/org/order_loan', {
        orderid: orderid
      })
    }
  },
  // 用户类
  user: {
    // 取消支付
    deposit_cancel(paymentid, ) {
      return httpPost(BASE_URL + '/user/deposit_cancel', {
        paymentid: paymentid
      })
    },
    // 押金支付
    deposit_pay() {
      return httpPost(BASE_URL + '/user/deposit_pay', {})
    },
    deposit_withdraw() {
      return httpPost(BASE_URL + '/user/deposit_withdraw', {})
    },
    // 用户信息
    info() {
      return httpGet(BASE_URL + '/user/info', {})
    },
    // 押金记录
    payment_list() {
      return httpGet(BASE_URL + '/user/payment_list', {})
    },
    // 绑定手机号
    tel_bind(tel, msgcode, comefrom) {
      return httpPost(BASE_URL + '/user/tel_bind', {
        tel: tel,
        msgcode: msgcode,
        comefrom: comefrom
      })
    },
  }
}