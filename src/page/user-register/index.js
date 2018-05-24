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
        // 用户名输入结束立即验证是否可用
        $('#username').on('blur',function(){
            var username = $.trim($(this).val())
            if(username){
                _user.checkUserName(username,
                    function(res){
                        formError.hide()
                    },
                    function(errorMsg){
                        formError.show(errorMsg)
                    }
                )
            }
        })
        // 触发表单提交
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
        // 获取表单内容 
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            confirmPassword: $.trim($('#confirmPassword').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        var formValidateResult = this.formValidate(formData) 

        if(formValidateResult.status){
            _user.register(formData,
                function(res){
                    window.location.href = './result.html?type=register'
                },
                function(errorMsg){
                    formError.show(errorMsg)
                }
            )
        }else {
            formError.show(formValidateResult.msg)
        }

    },
    // 表单验证
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
        if(formData.password.length<6){
            result.msg = '密码长度不能少于6位！'
            return result
        }
        if(formData.password !== formData.confirmPassword){
            result.msg = '两次密码不一致！'
            return result
        }
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '请输入正确的手机号！'
            return result
        }
        if(!_mm.validate(formData.email,'email')){
            result.msg = '请输入正确的邮箱！'
            return result
        }
        if(!_mm.validate(formData.question,'required')){
            result.msg = '密码提示问题不能为空'
            return result
        }
        if(!_mm.validate(formData.answer,'required')){
            result.msg = '密码提示答案不能为空！'
            return result
        }
        result.status = true
        result.msg = '正在注册中。。。'
        return result
    }
}

$(function () {
    page.init()
})