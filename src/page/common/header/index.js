require('./index.css')
var _mm = require('util/mm.js')

// 通用页面头部
var header = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    // 如果是通过搜索跳转到当前页面，将搜索关键词回填搜索框
    onload: function(){
        var keyword = _mm.getUrlParam('keyword')
        if(keyword){
            $('#search-input').val('keyword');
        }
    },
    bindEvent: function (){ 
        var _this = this
        // 点击按钮提交搜索
        $('#search-btn').on('click', function () {
            _this.searchSubmit()
        })
        // 输入框按回车提交搜索
        $('#search-input').on('keyup',function (e) {
            if(e.keyCode === 13){
                _this.searchSubmit()
            }
        })
    },
    searchSubmit: function(){
        var keyword = $('#search-input').val();
        if(keyword){
            window.location.href = './list.html?'+keyword
        }else {
            _mm.goHome()
        }
    }
}
header.init()