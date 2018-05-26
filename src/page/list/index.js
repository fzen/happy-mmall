require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/footer/index.js')
require('page/common/crumb/index.js')
require('./index.css')
var _mm = require('util/mm.js')
var _product = require('service/product-service.js')
var listTemplate = require('./list.string')
var Pagination = require('util/pagination/index.js')


var page = {
    data: {
        listTemplate: listTemplate,
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 2
        }
    },
    init: function () {
        this.loadList()
        this.bindEvent()
    },
    loadList: function () {
        var _this = this
        // 显示loading动画
        $('.list-container').html($('<div class="loading"></div>'))

        _product.getProductList(this.data.listParam, function (res) {
            var listHtml = _mm.renderHtml(_this.data.listTemplate, {
                list: res.list
            })
            $('.list-container').html(listHtml)

            // 加载分页器
            _this.loadPagination({
                container: $('.pagination'),
                hasPreviousPage: res.hasPreviousPage,
                hasNextPage: res.hasNextPage,
                prePage: res.prePage,                
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages,
                onSelectPage : function(pageNum){
                    _this.data.listParam.pageNum = pageNum
                    _this.loadList()
                }
            })
        }, function (msg) {
            _mm.errorTips(msg)
        })
    },
    bindEvent: function () {
        var _this = this
        // 监听排序方式按钮
        $('.sort-item').on('click', function () {
            _this.data.listParam.pageNum = 1
            $this = $(this)
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return
                } else {
                    $this.addClass('active')
                    $this.siblings().removeClass('active asc desc')
                    _this.data.listParam.orderBy = 'default'
                }
            } else {
                if ($this.hasClass('active')) {
                    if ($this.hasClass('asc')) {
                        $this.removeClass('asc').addClass('desc')
                        _this.data.listParam.orderBy = 'price_desc'
                    } else {
                        $this.removeClass('desc').addClass('asc')
                        _this.data.listParam.orderBy = 'price_asc'
                    }
                } else {
                    $this.addClass('active asc').siblings().removeClass('active')
                    _this.data.listParam.orderBy = 'price_asc'
                }
            }
            _this.loadList()
        })
    },
    loadPagination: function (pageInfo) { 
        this.pagination ? '' : (this.pagination = new Pagination())
        this.pagination.render(pageInfo)
    },


}

page.init()
