require('./index.css')
var template = require('./index.string')
var _mm = require('util/mm.js')

var Pagination = function(){
    var _this = this
    this.defaultOption = {
        container : null,
        pageNum : 1,
        pageRange : 3,
        onSelectPage : null
    }
        // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this)
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null
    })
}

Pagination.prototype.render = function(pageInfo){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, pageInfo)
    // 判断容器是否为合法的jQuery对象
    if(!(this.option.container instanceof jQuery)){
        return
    }
    // 只有1页不用显示分页器
    if(this.option.pages <= 1){
        return
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml())
    console.log('sdfsfsf')
    
}

Pagination.prototype.getPaginationHtml = function(){
    var html = '',
        option = this.option,
        pageArray = [],
        start = (option.pageNum - option.pageRange > 0) ? (option.pageNum - option.pageRange) : 1,
        end = (option.pageNum + option.pageRange < option.pages) ? (option.pageNum + option.pageRange) : option.pages
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    })
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        })
    }
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    })
    html = _mm.renderHtml(template, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    })
    return html
}

module.exports = Pagination