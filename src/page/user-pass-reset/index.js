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

var data = {
    username: '',
    question: '',
    answer: '',
    newPassword: '',
    token: ''
}

var page = {
    init: function(){
        this.loadStep('.step-one')
        this.bindEvent()
    },
    loadStep: function(step){
        $(step).show().siblings('.step-container').hide()
    },
    bindEvent: function () {
        var _this = this
        // 监听用户名提交按钮
        $('#submit-username').on('click',function(){
            var username = $.trim($('#username').val())    
            if(username){ 
                data.username = username 
                _user.getQuestion(username,
                    function(question){
                        data.question = question
                        _this.loadStep('.step-two')
                        $('.step-two .question').text(question)                    
                    },
                    function(errorMsg){
                        formError.show(errorMsg)
                    }
                )
            }else {
                formError.show('用户名不能为空！')
            }
        })
        // 监听密码提示问题答案提交按钮
        $('#submit-answer').on('click',function(){
            var answer = $.trim($('#answer').val())    
            if(answer){ 
                data.answer = answer 
                _user.checkAnswer({
                        username: data.username,
                        question: data.question,
                        answer: data.answer,
                    },
                    function(token){
                        data.token = token
                        _this.loadStep('.step-three')
                    },
                    function(errorMsg){
                        formError.show(errorMsg)
                    }
                )
            }else {
                formError.show('答案不能为空！')
            }
        })
        // 监听新密码提交按钮
        $('#submit-new').on('click',function(){ console.log('xxxx')
            var newPassword = $.trim($('#newPassword').val())    
            if(newPassword){ 
                data.newPassword = newPassword
                _user.resetPassword({
                        username: data.username,
                        passwordNew: data.newPassword,
                        forgetToken: data.token,
                    },
                    function(data,msg){
                        window.location.href = './result.html?type=resetPassword'
                    },
                    function(errorMsg){
                        formError.show('重置密码失败！')
                    }
                )
            }else {
                formError.show('答案不能为空！')
            } 
        })

        // $('.user-item input').on('keyup',function(e){
        //     // 按回车键提交
        //     if(e.keyCode === 13){
        //         _this.submit()
        //     }
        // })
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