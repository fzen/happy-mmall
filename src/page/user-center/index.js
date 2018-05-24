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
    }
}

page.init()
