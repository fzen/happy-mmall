require('./index.css')
require('../common/header-simple/index.js')
var  _mm = require('util/mm.js')

$(function(){
    // 获取页面提示类型
    var type = _mm.getUrlParam('type') || 'default'
    if(type === 'resetPassword'){
        $('.default-success').show().find('.result-title').text('找回密码密码成功！')
    }
    if(type === 'updatePassword'){
        $('.default-success').show().find('.result-title').text('重置密码密码成功！')
    }
    if(type === 'updateInfo'){
        $('.default-success').show().find('.result-title').text('修改个人信息成功！')
    }
    $resultTitle = $('.'+type+'-success')
    // 显示对应提示
    $resultTitle.show()
})