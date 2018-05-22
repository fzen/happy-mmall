var _mm = require('util/mm.js')

var _user = {
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
            url: _mm.getServerUrl('/user/get-user-info.do'),
            success: resolve,
            error: reject
        })
    }
}

module.exports = _user