// components/login/login.js
var app = getApp();

// import $api from '../../base/api'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // getUserInfo: function (e) {
    //   console.log(e)
    //   if (e.detail.errMsg == "getUserInfo:ok") {
    //     $api.common.login().then(data => {
    //       if(data.errcode == 0){
    //         app.globalData.sessionid = data.data.sessionid;
    //         wx.setStorageSync("sessionid", data.data.sessionid)
    //         this.setData({
    //           isShow: false
    //         });
    //       }
    //     });

    //   }
    // },

    // 向服务器发送code
    onLogin: function () {
      wx.login({
        success: res => {
          if (res.code) {
            wx.request({
              url: 'XXXXXX',
              method: 'post',
              header: {
                'content-type': 'application/json'
              },
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.data.openid) {
                  //获取到用户凭证存儲tokenID 
                  var json = JSON.parse(res.data.Data)
                  wx.setStorage({
                    key: "tokenID",
                    data: json.tokenID
                  })
                  // getUserInfo()
                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
              }
            })
          }
        },
        fail: function (res) {

        }
      })
    },
    getUserInfo: function () {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          // userInfoSetInSQL(userInfo)
          console.log(res)
        },
        fail: function () {
          // userAccess()
        }
      })
    },

    // userInfoSetInSQL: function (userInfo) {
    //   wx.getStorage({
    //     key: 'third_Session',
    //     success: function (res) {
    //       wx.request({
    //         url: 'Our Server ApiUrl',
    //         data: {
    //           third_Session: res.data,
    //           nickName: userInfo.nickName,
    //           avatarUrl: userInfo.avatarUrl,
    //           gender: userInfo.gender,
    //           province: userInfo.province,
    //           city: userInfo.city,
    //           country: userInfo.country
    //         },
    //         success: function (res) {
    //           if (res) {
    //             //SQL更新用户数据成功
    //           } else {
    //             //SQL更新用户数据失败
    //           }
    //         }
    //       })
    //     }
    //   })
    // }


    //校验是否存在登入状态
    checkSession: function () {
      wx.checkSession({
        success: function (res) {
          // console.log(res.errMsg)
        },
        fail: function () {
          // onLogin()
        }
      })
    }

  }
})