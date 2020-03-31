'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  //添加此选项即可增加 autoprefixer的支持
  postcss: [
    require("autoprefixer")({
      browsers: [
        "> 1%",
        "last 10 versions",
        "not ie <= 8",
        "iOS >= 8",
        "Firefox >= 20",
        "Android > 4.4"
      ]
    })
  ]
  };

