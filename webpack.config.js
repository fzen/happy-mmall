var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 环境变量配置，dev / online 
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        // favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

// webpack config 
var config = {
    // mode参数，webpack4中要指定模式，可以放在配置文件这里，也可以放在启动命令里，如--mode production
    mode: 'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry: {
        'common': './src/page/common/index.js',
        'index': './src/page/index/index.js',
        'list': './src/page/list/index.js',
        'detail': './src/page/detail/index.js',
        'cart': './src/page/cart/index.js',
        'order-confirm': './src/page/order-confirm/index.js',
        'order-list': './src/page/order-list/index.js',
        'order-detail': './src/page/order-detail/index.js',
        'payment': './src/page/payment/index.js',
        'user-login': './src/page/user-login/index.js',
        'user-register': './src/page/user-register/index.js',
        'user-pass-reset': './src/page/user-pass-reset/index.js',
        'user-center': './src/page/user-center/index.js',
        'user-center-update': './src/page/user-center-update/index.js',
        'user-pass-update': './src/page/user-pass-update/index.js',
        'result': './src/page/result/index.js',
        'about': './src/page/about/index.js',
    },
    output: {
        // 【改动】：删除path的配置，在webpack4中文件默认生成的位置就是/dist, * 而publicPath和filename特性的设置要保留
        // path : __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        filename: 'js/[name].js'
    },
    externals: { 'jquery': 'window.jQuery' },
    module: {
        rules: [
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // 模板文件的处理
            {
                test: /\.string$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeAttributeQuotes: false
                    }
                }
            },
            // 图片文件的处理
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2048,  //图片小于2kb的按base64打包
                        name: 'resource/[name].[ext]'
                    }
                }]
            },
            // 字体和图标的处理
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }]
            }

        ]
    },
    // 配置路径简写
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            images: __dirname + '/src/images'
        }
    },
    //【新增】：webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面
    // optimization: {
    //     runtimeChunk: false,
    //     splitChunks: {
    //         cacheGroups: {
    //             common: {
    //                 name: "common",
    //                 chunks: "all",
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // },
    plugins: [
        // 【移除】：webpack4里面移除了commonChunksPulgin插件
        //  独立通用模块到js/base.js 
        //      new webpack.optimize.CommonsChunkPlugin({ 
        //          name : 'common', 
        //          filename : 'js/base.js' 
        //      }), 
        // 把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
        // new webpack.HotModuleReplacementPlugin()

    ],
    devServer: {
        port: 8080,
        inline: true,
        // hot: true,
        // proxy: {
        //     '**/*.do':
        //         {
        //             target: 'http://test.happymmall.com',
        //             changeOrigin: true
        //         }
        // }
    }

}
module.exports = config
