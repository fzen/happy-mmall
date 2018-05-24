require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/footer/index.js')
require('page/common/crumb/index.js')
require('./index.css')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var panelTemplate = require('./index.string')


var page = {
    init: function(){
        // 初始化左侧边栏
        navSide.init({
            name: 'user-center'
        })
        // 加载用户信息
        this.loadUserInfo()
        // 监听提交事件
        this.bindEvent()
    },
    loadUserInfo: function(){
        _user.getUserInfo(
            function(userInfo){
                var panelHtml = _mm.renderHtml(panelTemplate,userInfo)
                $('.panel .panel-content').html(panelHtml)
            },
            function(){

            }
        )
    },
    bindEvent: function(){
        _this = this
        $('.btn-submit').on('click',function(){
            var userInfo = {
                email: $.trim($('#email').val()),
                phone: $.trim($('#phone').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            }
            validateResult = _this.formValidate(userInfo)
            if (validateResult.status){
                _user.updateInfo(userInfo,function(){
                    window.location.href = './result.html?type=updateInfo'
                },function(){

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
        return result
    }
}

page.init()
