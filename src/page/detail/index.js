require('./index.css')
require('page/common/crumb/index.js')
require('page/common/header/index.js')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
var template = require('./index.string')
var _mm = require('util/mm.js')
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
        stock: 0
    },
    init :function(){
        this.checkProductId()
        this.loadDetail()
        this.bindEvent()
    },
    checkProductId: function(){
        // 如果没有 productId,跳转到主页
        if(!this.data.productId){
            _mm.goHome()
        }
    },
    loadDetail: function(){
        var _this = this
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res)
            _this.data.stock = res.stock
            var introHtml = _mm.renderHtml(template,res)
            $('.page-wrap').html(introHtml)
        },function(){
            $('.page-wrap').html('<p class="error-tip">该商品已经飞到火星上去啦！</p>')
        })
    },
    filter: function(data){
        data.subImages = data.subImages.split(',')
    },
    bindEvent: function(){
        var _this = this
        // 鼠标放上缩略图更新大图
        $(document).on('mouseenter','.small-img-item',function(){ 
            var imgUrl = $(this).find('.small-img').attr('src')
            $('.main-img').attr('src',imgUrl)
            $(this).addClass('active').siblings().removeClass('active')
        })
        // 增加/减少购物个数
        $(document).on('click','.count-btn',function(){
            var type = $(this).hasClass('count-add') ? 'add' : 'minus'
            var $count = $('.count')
            var currentCount = parseInt($count.val())
            var maxCount = _this.data.stock ;console.log(maxCount)
            var minCount = 1
            if(type === 'add'){ 
                $count.val(currentCount+1 > maxCount ? maxCount : currentCount+1)
            }else {
                $count.val(currentCount-1 < minCount ? 1 : currentCount-1)
            }
        })
        // 加入购物车
        $(document).on('click','.cart-add',function(){console.log(parseInt($('.count').val()))
            _cart.addToCart({
                productId: _this.data.productId,
                count: parseInt($('.count').val())
            },function(res){
                window.location.href = './result.html?type=cart-add'
            },function(){
                _mm.errorTips('添加到购物车失败！')
            })
        })
    }
}

page.init()