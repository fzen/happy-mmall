var Hogan = require('hogan.js')

var conf = {
    serverHost: ''
}

var _mm = {
    // 封装网络请求工具
    request: function(param){
        var _this = this
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            // 这里是网络请求成功
            success: function(res){  
                // 这里是与后端约定status为0时成功
                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                // 后端返回 10 说明需要登录，跳转到登录页面
                }else if(res.status === 10){
                    _this.doLogin()
                //请求数据错误
                }else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function(err){
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    // 获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path
    },
    // 获取url参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')    // 匹配 以 name 开头或 & 开头，那后面接 = ，= 后面是任意个不是 & 的字符，最后碰到&或到尾部停止。
        var result =  window.location.search.slice(1).match(reg)  // match方法如果能匹配到的话，返回一个数组，数组第一项是匹配到的结果，后面依次是正则里括号中匹配的内容，再后面是index和input两个固定参数
        return result ? decodeURIComponent(result[2]) : null
    },
    // 渲染html模版
    renderHtml: function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate)
        var result = template.render(data)
        return result
    },
    // 成功提示
    successTips: function(msg){
        alert(msg||'操作成功！')
    },
    // 错误提示
    errorTips: function(msg){
        alert(msg||'哪里不对了吧')
    },
    // 字段验证，支持是非空判断、手机号判断、邮箱判断
    validate: function(value,type){
        var value = $.trim(value)
        // 非空验证
        if(type === 'require'){
            return !!value
        }
        // 手机号验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(value)
        }
        // 邮箱验证
        if(type === 'email'){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        }
    },
    // 跳转到登录页面，并将当前页面url作为查询参数传递，以便登录成功后跳转回当前页面
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href) 
    },
    // 跳转到主页
    goHome: function(){
        window.location.href = './index.html'
    }
}

module.exports = _mm