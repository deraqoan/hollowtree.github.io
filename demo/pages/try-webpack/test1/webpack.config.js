'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //入口文件
    entry: './src/index.js',
    //输出编译得到的文件
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    plugins: [
        //给输出的文件头部添加注释信息
        new webpack.BannerPlugin('hollowtree'),
        //生成一个html文件来加载编译后的代码
        new HtmlWebpackPlugin({
            title: 'Hello World!'
        })
    ],
    module: {
        loaders: [
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.less$/, loaders: ['style', 'css', 'less'] },
            { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] }
        ]
    },
    //在本地启动一个web服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
}
