require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/footer/index.js')
require('page/common/crumb/index.js')
require('./index.css')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')


var page = {
    init: function(){
        // 初始化左侧边栏
        navSide.init({
            name: 'pass-update'
        })
        // 监听提交事件
        this.bindEvent()
    },
    bindEvent: function(){
        _this = this
        $('.btn-submit').on('click',function(){
            var userInfo = {
                oldPassword: $.trim($('#oldPassword').val()),
                newPassword: $.trim($('#newPassword').val()),
                checkNewPassword: $.trim($('#checkNewPassword').val())
            }
            validateResult = _this.formValidate(userInfo)
            if (validateResult.status){
                _user.resetPasswordOnLogin({
                    passwordOld: userInfo.oldPassword,
                    passwordNew: userInfo.newPassword
                },function(){
                    window.location.href = './result.html?type=updatePassword'
                },function(msg){
                    _mm.errorTips(msg)
                })
            }else {
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(formData.oldPassword.length<6 || formData.newPassword.length<6 || formData.checkNewPassword.length<6){
            result.msg = '密码长度不少于6位！'
            return result
        }
        if(formData.newPassword != formData.checkNewPassword){
            result.msg = '两次密码输入不一致！'
            return result
        }

        result.status = true
        return result
    }
}

page.init()
