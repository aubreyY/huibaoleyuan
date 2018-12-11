import $api from "./base/api";
import {
    initPeerid,
    initSessionid,
    initConfigDict,
    initConfigInfo,
    initUserInfo,
    initUserLocation,
    initAreaDict,
    initMap,
    updateBookbagStat
} from "./base/util";

App({
    onLaunch: function (options) {
        if (options.comefrom) {
            wx.setStorageSync("comefrom", options.comefrom)
        }
        $api.common.config_info(this.globalData.configInfo.checksum).then(data => {
            if (data.errcode === 0) {
                if (data.data.checksum) {
                    this.globalData.configInfo = data.data;
                    wx.setStorageSync("configInfo", data.data)
                }
            }

        });
        $api.common.config_dict(this.globalData.configDict.checksum).then(data => {
            if (data.errcode === 0) {
                if (data.data.checksum) {
                    this.globalData.configDict = data.data;
                    wx.setStorageSync("configDict", data.data)

                }
            }
        });
        this.reloadUserInfo();
        this.globalData.systemInfo = wx.getSystemInfoSync();
    },
    reloadUserInfo(callback) {
        if (this.isLogined()) {
            $api.user.info().then(data => {
                if (data.errcode === 0) {
                    this.saveUserInfo(data.data);
                    if (callback) {
                        callback(data.data);
                    }
                } else if (data.errcode === 4101) {
                    this.globalData.sessionid = '';
                    this.globalData.userInfo = null;
                    wx.removeStorageSync("userInfo")
                    wx.removeStorageSync("sessionid")
                }
            });
        }
    },
    isLogined: function () {
        return (this.globalData.sessionid && this.globalData.sessionid != '')
    },
    // 储存用户信息和sessionid
    saveSessionid(sessionid) {
        this.globalData.sessionid = sessionid;
        wx.setStorageSync("sessionid", sessionid)
    },
    saveUserInfo(userInfo) {
        userInfo.tel2 = userInfo.tel.substring(0,3) + '*****' + userInfo.tel.substring(8);
        this.globalData.userInfo = userInfo;
        wx.setStorageSync("userInfo", userInfo)
    },
    saveUserLocation(data) {
        this.globalData.userLocation = data;
        wx.setStorageSync("userLocation", data)
    },
    setAreaDict(province, areaDict) {
        this.globalData.areaDict[province] = areaDict;
        wx.setStorageSync("areaDict", this.globalData.areaDict)
    },
    updateBookbagStat(bookbag) {
        updateBookbagStat(bookbag);
    },
    calcOrgMapDistance(orgInfo) {
        var coordinate = orgInfo.coordinate.split(",");
        if (coordinate.length > 1) {
            console.log(parseFloat(coordinate[0]), parseFloat(coordinate[1]));
            this.globalData.map.calculateDistance({
                to: [{
                    longitude: parseFloat(coordinate[0]),
                    latitude: parseFloat(coordinate[1]),
                }],
                success: function (res) {
                    console.log(res);
                    orgInfo.distance = Math.floor(res.result.elements[0].distance / 1000 * 100) / 100;
                    console.log(orgInfo.distance)
                },
                fail: function (res) {
                    console.log(res);
                }
            })
        } else {
            orgInfo.distance = 0;
        }
    },
    globalData: {
        peerid: initPeerid(),
        sessionid: initSessionid(),
        configDict: initConfigDict(),
        configInfo: initConfigInfo(),
        userInfo: initUserInfo(),
        userLocation: initUserLocation(),
        map: initMap(),
        areaDict: initAreaDict(),
        systemInfo: {}
    }
});