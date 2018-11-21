import {
  BASE_URL,
  UPLOAD_URL
} from './config'
import {
  initPeerid,
  initSessionid
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
        if (loading) {
          wx.hideLoading()
        }
        if (res.data.errcode === 4101) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          wx.showToast({
            icon: 'none',
            title: "登录状态失效，重新登录",
            duration: 1000,
            success() {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/user/index'
                });
              }, 1000)
            }
          });
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
  // console.log(data);
  data.peerid = initPeerid();
  data.sessionid = initSessionid();

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
        if (loading) {
          wx.hideLoading()
        }
        resolve(res.data);
        if (res.data.errcode === 4101) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('userInfo');
          wx.showToast({
            icon: 'none',
            title: "登录状态失效，重新登录",
            duration: 1000,
            success() {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/user/index'
                });
              }, 1000)
            }
          });
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
  // 列表类
  bookbag: {
    bookinfo(bookid) {
      return httpGet(BASE_URL + '/bookbag/bookinfo', {
        bookid: bookid
      })
    },
    info(bagid) {
      return httpGet(BASE_URL + '/bookbag/info', {
        bagid: bagid
      })
    },
    list(pagenum) {
      return httpGet(BASE_URL + '/bookbag/list', {
        pagenum: pagenum
      })
    }
  },
  // 通用类
  common: {
    area_dict() {
      return httpGet(BASE_URL + '/common/areadict', {})
    },
    area_list() {
      return httpGet(BASE_URL + '/common/arealist', {})
    },
    captcha() {
      return httpGet(BASE_URL + '/common/captcha', {})
    },
    config_dict(checksum) {
      return httpGet(BASE_URL + '/common/configdict', {
        checksum: checksum
      })
    },
    config_info(checksum) {
      return httpGet(BASE_URL + '/common/config_info', {
        checksum: checksum
      })
    },
    login(code, data, iv) {
      return httpPost(BASE_URL + '/common/login', {
        code: code,
        data: data,
        iv: iv
      })
    },
    msgcode(biztype, tel, imageid, iconx, icony) {
      return httpPost(BASE_URL + '/common/msgcode', {
        biztype: biztype,
        tel: tel,
        imageid: imageid,
        iconx: iconx,
        icony: icony
      })
    }
  },
  // 订单类
  order: {
    craete(orgid, bagid) {
      return httpPost(BASE_URL + '/order/craete', {
        orgid: orgid,
        bagid: bagid
      })
    },
    delete(orderid) {
      return httpPost(BASE_URL + '/order/delete', {
        orderid: orderid
      })
    },
    info(orderid) {
      return httpGet(BASE_URL + '/order/info', {
        orderid: orderid
      })
    },
    list() {
      return httpGet(BASE_URL + '/order/list', {})
    }
  },
  // 机构类
  org: {
    area_list(city, county, town) {
      return httpGet(BASE_URL + '/org/arealist', {
        city: city,
        county: county,
        town: town
      })
    },
    bookbag_info(orgid, bagid) {
      return httpGet(BASE_URL + '/org/bookbaginfo', {
        orgid: orgid,
        bagid: bagid
      })
    },
    bookbag_list(orgid) {
      return httpGet(BASE_URL + '/org/bookbaglist', {
        orgid: orgid
      })
    },
    info(orgid) {
      return httpGet(BASE_URL + '/org/info', {
        orgid: orgid
      })
    },
    order_delete(orderid) {
      return httpPost(BASE_URL + '/org/orderdelete', {
        orderid: orderid
      })
    },
    order_finish(orderid, reparation, remake) {
      return httpPost(BASE_URL + '/org/orderfinish', {
        orderid: orderid,
        reparation: reparation,
        remake: remake
      })
    },
    order_info(orderid) {
      return httpGet(BASE_URL + '/org/orderinfo', {
        orderid: orderid
      })
    },
    order_list() {
      return httpGet(BASE_URL + '/org/orderlist', {})
    },
    order_loan(orderid) {
      return httpPost(BASE_URL + '/org/orderloan', {
        orderid: orderid
      })
    }
  },
  // 用户类
  user: {
    deposit_cancel() {
      return httpPost(BASE_URL + '/user/depositcancel', {})
    },
    deposit_list() {
      return httpGet(BASE_URL + '/user/depositlist', {})
    },
    deposit_pay() {
      return httpPost(BASE_URL + '/user/depositpay', {})
    },
    deposit_withdraw() {
      return httpPost(BASE_URL + '/user/depositwithdraw', {})
    },
    info() {
      return httpGet(BASE_URL + '/user/info', {})
    },
    payment_list() {
      return httpGet(BASE_URL + '/user/paymentlist', {})
    },
    telbind(tel, msgcode, comefrom) {
      return httpPost(BASE_URL + '/user/telbind', {
        tel: tel,
        msgcode: msgcode,
        comefrom: comefrom
      })
    },
  }
}