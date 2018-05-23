var _mm = require('util/mm.js')

var _user = {
    // 用户注册
    register: function(userInfo,resolve,reject){
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 用户登录
    login: function(userInfo,resolve,reject){
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 退出登录
    logout: function(resolve,reject){
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/logout.do'),
            success: resolve,
            error: reject
        })
    },
    // 检查登录状态
    checkLogin: function(resolve,reject){
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/get_user_info.do'),
            success: resolve,
            error: reject
        })
    },
    // 检查用户名是否可用
    checkUserName: function(username,resolve,reject){
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            success: resolve,
            error: reject
        })
    }
}

module.exports = _user