var app = getApp();
import $api from "../../base/api";
Page({
  data: {
    userInfo:{},

  },
  onLoad() {
    wx.checkSession({
      success:function(res){
        console.log(JSON.stringify(res))
        if(res.errMsg == 'checkSession:ok' && app.isLogined()){
          wx.navigateBack({delta: -1})
        }else{
          wx.login({
            success: function (res2) {
              if (res2.code) {
                wx.getUserInfo({
                  success: function (res3) {
                    console.log(JSON.stringify(res3))
                    $api.common.login(res2.code, res3.encryptedData, res3.iv).then(data => {
                      console.log(data);
                      if (data.errcode === 0) {
                        app.saveSessionid(data.data.sessionid);
                        app.saveUserInfo(JSON.parse(res3.rawData));
                        wx.showToast({
                          icon: 'success',
                          title: "登录成功",
                          duration: 2000,
                          success: function(){
                            console.log("showToast");
                            wx.navigateBack({delta: -1})
                          }
                        });
                        
                      } else {
                        wx.showToast({
                          icon: 'none',
                          title: "登录失败：" + data.data.errcode,
                          duration: 2000,
                        });
                      }
                    })
                  },
                  fail(err) {
                    wx.showToast({
                      icon: 'none',
                      title: err,
                      duration: 2000,
                    });
                  }
                });
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            },
            fail(err) {
              wx.showToast({
                icon: 'none',
                title: err,
                duration: 2000,
              });
            }
          });
        }
      },
      fail: function(res){

      }
    })
  },
  onShow(){

  },
});