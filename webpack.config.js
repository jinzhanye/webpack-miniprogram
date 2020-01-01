const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin');
const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

module.exports = {
  context: resolve('src'), // ?
  entry: './app.js',
  // entry: {// 从这几个入口开始进度依赖分析，不能只写 app.js，因为 app.js 并不依赖其他页面，如果不把所有页面写出来
  //   // 那边他们不会被打包进 dist
  //   app: './app.js',
  // },
  output: {
    globalObject: 'wx',
    path: resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: ['**/*.js'],// 排除二级目录下的 js ？？
      },
    ]),
    new MinaWebpackPlugin(),
    new MinaRuntimePlugin(),
    new LodashWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  mode: 'none',
}
