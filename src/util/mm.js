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
    // 跳转到登录页面，并将当前页面url作为查询参数传递，以便登录成功后跳转回当前页面
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href) 
    },
}

module.exports = _mm