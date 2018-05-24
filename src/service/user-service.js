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
    // 找回密码--获取用户密码提示问题
    getQuestion: function (username,resolve, reject) { console.log(username)
        _mm.request({  
            method: 'POST',
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            success: resolve,
            error: reject
        })
    },
    // 找回密码--验证密码提示答案
    checkAnswer: function (userInfo,resolve, reject) {
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 找回密码--重置密码
    resetPassword: function (userInfo, resolve, reject) {
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 登录状态下--重置密码
    resetPasswordOnLogin: function (userInfo, resolve, reject) {
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 登录状态更新个人信息
    updateInfo: function (userInfo, resolve, reject) {
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/update_information.do'),
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 获取全部用户信息
    getUserInfo: function (resolve, reject) {
        _mm.request({
            method: 'POST',
            url: _mm.getServerUrl('/user/get_information.do'),
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