require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
var Swiper = require('node_modules/swiper/dist/js/swiper.min.js')
require('node_modules/swiper/dist/css/swiper.min.css')
var _mm = require('util/mm.js')

	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: {
			disableOnInteraction: false,
		},
		grabCursor: true,
		// 分页器
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
			clickable :true
		},

		// 前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	})
