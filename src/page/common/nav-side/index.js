require('./index.css')
var _mm = require('util/mm.js')
var template = require('./template.string')

var navSide = {
    options: {
        // 当前页面
        name: 'user-center',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: './user-pass-update.html'},
            {name: 'about', desc: '关于MMALL', href: './about.html'}
        ]
    },
    init: function(options){
        // 合并选项
        $.extend(this.options, options)
        this.renderNav(template,this.options.navList)
    },
    renderNav: function () {
        // 找出active类
        for(var i=0, navListLength=this.options.navList.length; i<navListLength; i++){
            if(this.options.navList[i].name === this.options.name){
                this.options.navList[i].isActive = true
            }
        }
        // 渲染模版
        var navHtml = _mm.renderHtml(template,{navList:this.options.navList})
        $('.nav-side').html(navHtml)
    }
    
}

module.exports = navSide