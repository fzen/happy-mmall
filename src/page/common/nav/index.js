require('./index.css')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')

// 导航条
var nav = {
    init: function(){
        this.bindEvent()
        this.loadUserInfo()
        this.loadCartCount()
        return this
    },
    bindEvent: function(){
        // 登录点击事件
        $('.js-login').on('click',function(){
            _mm.doLogin()
        })
        // 注册点击事件
        $('.js-register').on('click',function(){
            window.location.href = './register.html'
        })
        // 退出登录点击事件
        $('.js-logout').on('click',function(){
            _user.logout(
                function(res){
                    window.location.reload()
                },
                function(errMsg){
                    _mm.errorTips(errMsg)
                }
            )
        })
    },
    // 加载用户信息
    loadUserInfo: function(){
        _user.checkLogin(
            // 已登录
            function(res){
                $('.user.not-login').hide()
                    .siblings('.user.login').show()
                    .find('.username').text(res.username)
            },
            // 未登录
            function(){}
        )
    },
    // 加载购物车数量
    loadCartCount: function(){
        _cart.getCartCount(
            // 获取成功
            function(res){
                $('.nav .cart-count').text(res)
            },
            // 获取失败
            function(errMsg){
                $('.nav .cart-count').text(0)                
            }
        )
    }
}

module.exports = nav.init()