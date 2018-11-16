// import  $api from "./base/api";
// import { initPeerid, initSessionid, initConfigDict, initConfigInfo, initUserInfo } from "./base/util";

// App({
//   onLaunch: function (options)  {
//     $api.common.config_info(this.globalData.configInfo.checksum).then(data => {
//       if (data.errcode === 0) {
//         if(data.data.checksum){
//           this.globalData.configInfo = data.data;
//           wx.setStorageSync("configInfo", data.data)
//         }
//       }
//     });
//     $api.common.config_dict(this.globalData.configDict.checksum).then(data => {
//       if (data.errcode === 0) {
//         if(data.data.checksum){
//           this.globalData.configDict = data.data;
//           wx.setStorageSync("configDict", data.data)
//         }
//       }
//     });
//     if(this.isLogined()){
//       $api.user.info().then(data => {
//         if (data.errcode === 0) {
//           this.globalData.userInfo = data.data;
//           wx.setStorageSync("userInfo", data.data)
//         }else if(data.errcode === 4101){
//           this.globalData.sessionid = '';
//           this.globalData.userInfo = null;
//           wx.removeStorageSync("userInfo")
//           wx.removeStorageSync("sessionid")
//         }
//       });
//     }
//   },
//   isLogined: function(){
//     return (this.globalData.sessionid && this.globalData.sessionid!='')
//   },

//   saveSessionid(sessionid){
//     this.globalData.sessionid = sessionid;
//     wx.setStorageSync("sessionid", sessionid)
//   },
//   saveUserInfo(userInfo){
//     this.globalData.userInfo = userInfo;
//     wx.setStorageSync("userInfo", userInfo)
//   },
//   globalData: {
//     peerid: initPeerid(),
//     sessionid: initSessionid(), 
//     configDict: initConfigDict(),
//     configInfo: initConfigInfo(),
//     userInfo: initUserInfo(),
//   }
// });