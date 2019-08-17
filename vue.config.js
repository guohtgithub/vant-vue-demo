const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  // 输出文件目录
  outputDir:'docs',

  //eslint-loader 是否在保存的时候检查
  lintOnSave:false,

  // webpack 配置
  chainWebpack: (config) => {
    config.resolve.symlinks(true)
  },
  configureWebpack: (config) => {
    // 引入文件配置
    return {
      resolve:{
        alias:{
          '@view':resolve('src/view'),
          '@components':resolve('src/components'),
          '@assets':resolve('src/assets'),
          '@api':resolve('src/api')
        }
      }
    }
  },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap:false,

// 基本路径
  publicPath:process.env.NODE_ENV === 'production' ? 
    '/vant-demo' : '/',

  // css 相关配置
  css:{
    //是否使用css 分离插件 ExtractTextPlugin
    // extract:true,
    // 开启 css source maps?
    sourceMap:false,
    //css 预设器配置项
    loaderOptions:{
      postcss:{
        plugins:[
          autoprefixer(),
          pxtorem({
            rootValue:16,
            propList:['*'], // ['font','font-size','line-height','letter-spacing'] 指定转换成rem得属性，支持 *
            selectorBlackList:['van-circle__layer']
            // unitPrecision:5, // 转rem精确到小数点多少位
            // mediaQuery:false, // 媒体查询内的px 是否转换
            // minPixelValue:0 // 小于指定数值的px 不转换
          })
        ]
      }
    },
    // 启用 css modules for all css / pre-processor files
    modules:false
  },

  // use thread-loader for babel $ TS in production build enabled by default if the macheine has more than 1 cores
  parallel:require('os').cpus().length > 1,

  // pwa 插件相关配置
  pwa:{},

  // webpack-dev-server 相关配置
  devServer:{
    open:process.platform === 'darwin',
    host:'0.0.0.0',
    port:'8080',
    https:false,
    hotOnly:false,
    proxy:{
      './api':{
        target:'http://192.168.0.102:3030/',
        ws:false,
        changeOrigin:false
      }
    },
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions:{

  }
}