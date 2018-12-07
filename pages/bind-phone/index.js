var app = getApp();
import $api from '../../base/api'
import {
    shareConfig,
    IMG_URL
} from "../../base/config";
Page({
    data: {
        tel: '',
        msgcode: '',
        comefrom: '',
        msgcodeText: '请获取验证码',
        msgcodeDisabled: false,
        submitDisabled: false,
    },
    onLoad(options) {

    },
    // 获取输入的手机号和验证码
    getPhoneValue: function (event) {
        this.setData({
            tel: event.detail.value
        })
    },
    getCodeValue: function (event) {
        this.setData({
            msgcode: event.detail.value
        })
    },
    // 获取短信验证码
    getMsgcode: function () {
        if (this.data.msgcodeDisabled) {
            return;
        }
        var _this = this;
        if (this.data.tel == "") {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!/^1\d{10}$/.test(this.data.tel)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 1000
            })
            return false;
        }

        this.setData({
            msgcodeDisabled: true
        })

        var msgcodeSeconds = 90;
        var msgcodeTimer = setInterval(function () {
            msgcodeSeconds--;
            if (msgcodeSeconds <= 0) {
                clearInterval(msgcodeTimer);
                msgcodeTimer = null;
                _this.setData({
                    msgcodeText: '重新发送',
                    msgcodeDisabled: false
                })
            } else {
                _this.setData({
                    msgcodeText: msgcodeSeconds + "s",
                    msgcodeDisabled: true
                })
            }
        }, 1000);
        $api.common.msgcode("bind", this.data.tel).then(data => {
            if (data.errcode === 0) {
                console.log(data)
                wx.showToast({
                    title: '验证码已发送',
                    icon: 'none',
                    duration: 1000
                })
            } else if (data.errcode === 4108) {
                wx.showToast({
                    title: '账户已存在',
                    icon: 'none',
                    duration: 1000,
                    success: function () {
                        clearInterval(msgcodeTimer);
                        msgcodeTimer = null;
                        _this.setData({
                            msgcodeText: '请获取验证码',
                            msgcodeDisabled: false
                        })
                    }
                })
            } else {
                wx.showToast({
                    title: '请稍后再试',
                    icon: 'none',
                    duration: 1000,
                    success: function () {
                        clearInterval(msgcodeTimer);
                        msgcodeTimer = null;
                        _this.setData({
                            msgcodeText: '重新发送',
                            msgcodeDisabled: false
                        })
                    }
                })
                console.log(data)
            }
        })
    },
    //提交表单信息
    submitForm: function () {
        var _this = this;
        if (this.data.submitDisabled) {
            return;
        }
        if (this.data.tel == "") {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!/^1\d{10}$/.test(this.data.tel)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (this.data.msgcode == "") {
            wx.showToast({
                title: '验证码不能为空',
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        if (!this.data.msgcode) {
            wx.showToast({
                title: '验证码错误',
                icon: 'none',
                duration: 1000
            })
            return false;
        }
        _this.setData({
            submitDisabled: true
        })
        $api.user.tel_bind(this.data.tel, this.data.msgcode).then(data => {
            if (data.errcode === 0) {
                console.log(data)
                wx.showToast({
                    title: '绑定成功',
                    icon: 'none',
                    duration: 1000,
                    success: function () {
                        app.saveUserInfo(data.data);
                        wx.switchTab({
                            url: '../home/index',
                            success: function (e) {
                                var page = getCurrentPages().pop();
                                if (page == undefined || page == null) return;
                                page.onLoad();
                            }
                        })
                    }
                })
            } else {
                console.log(data)
                wx.showToast({
                    title: '绑定失败，请90秒后再试',
                    icon: 'none',
                    duration: 1000
                })
                _this.setData({
                    submitDisabled: false
                })
            }
        })
    }
});