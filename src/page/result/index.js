require('./index.css')
require('../common/header-simple/index.js')
var  _mm = require('util/mm.js')

$(function(){
    // 获取页面提示类型
    var type = _mm.getUrlParam('type') || 'default'
    $resultTitle = $('.'+type+'-success')
    // 显示对应提示
    $resultTitle.show()
})