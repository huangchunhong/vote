'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  // Dev：开发环境，该环境下的配置项只影响开发人员本地代码配置，在项目初期代码本地编写时调试使用

// Test：测试环境，该环境配置影响整个团队的测试环境

// Production：正式生产环境，程序最终发布后所需要的参数配置


  dev: {// dev 环境

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8888,  // 运行测试页面的端口// can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,//运行时谷歌自动的打开项目
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {//production 环境
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),// 编译输入的 index.html 文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    assetsPublicPath: './',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名 
    // vue项目发布到github上 需要改为 ./  .gitignore文件要不能忽略dist npm run build 打包上传到github上 网页输入https://huangchunhong.github.io/vue_test/dist/#/ 就可以浏览


    /**
     * Source Maps
     */

    productionSourceMap: true,// 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
