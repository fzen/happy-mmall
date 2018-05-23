require('./index.css')
require('../common/header-simple/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')

// 表单错误提示
var formError = {
    show: function(errorMsg){
        $('.error-item').show().find('.error-msg').text(errorMsg)
    },
    hide: function (msg) {
        $('.error-item').hide()
    }
}

var page = {
    init: function(){
        this.bindEvent()
    },
    bindEvent: function () { 
        var _this = this
        $('#submit').on('click',function(){
            _this.submit()
        })
        $('.user-item input').on('keyup',function(e){
            // 按回车键提交
            if(e.keyCode === 13){
                _this.submit()
            }
        })
        $('.user-item input').on('focus',function(e){
            // input获取焦点隐藏错误提示
            formError.hide()
        })      
    },
    submit: function(){
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        }
        var formValidateResult = this.formValidate(formData) 
        if(formValidateResult.status){
            _user.login(formData,
                function(res){
                    window.location.href = _mm.getUrlParam('redirect') || './index.html'
                },
                function(errorMsg){
                    formError.show(errorMsg)
                }
            )
        }else {
            formError.show(formValidateResult.msg)
        }

    },
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        }
        if(!_mm.validate(formData.username,'required')){
            result.msg = '用户名不能为空！'
            return result
        }
        if(!_mm.validate(formData.password,'required')){
            result.msg = '密码不能为空！'
            return result
        }
        result.status = true
        result.msg = '正在登录中。。。'
        return result
    }
}

$(function () {
    page.init()
})