// plugin/MinaWebpackPlugin.js
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const path = require('path')
const fs = require('fs')
const replaceExt = require('replace-ext')

function itemToPlugin(context, item, name) {
  if (Array.isArray(item)) {
    return new MultiEntryPlugin(context, item, name)
  }
  return new SingleEntryPlugin(context, item, name)
}

function _inflateEntries(entries = [], dirname, entry) {
  // 获取  index.json 路径
  const configFile = replaceExt(entry, '.json')
  // 读取 index.json
  const content = fs.readFileSync(configFile, 'utf8')
  const config = JSON.parse(content)

  // 根据 json 配置的路径递归解析 'pages', 'usingComponents' 增加入口
  ;['pages', 'usingComponents'].forEach(key => {
    const items = config[key]
    if (typeof items === 'object') {
      Object.values(items).forEach(item => inflateEntries(entries, dirname, item))
    }
  })
}

function inflateEntries(entries, dirname, entry) {
  entry = path.resolve(dirname, entry)
  if (entry != null && !entries.includes(entry)) {
    entries.push(entry)
    _inflateEntries(entries, path.dirname(entry), entry)
  }
}

class MinaWebpackPlugin {
  constructor() {
    this.entries = []
  }

  // apply 是每一个插件的入口
  apply(compiler) {
    const { context, entry } = compiler.options
    // 找到所有的入口文件，存放在 entries 里面
    inflateEntries(this.entries, context, entry)

    // 这里订阅了 compiler 的 entryOption 事件，当事件发生时，就会执行回调里的代码
    compiler.hooks.entryOption.tap('MinaWebpackPlugin', () => {
      this.entries
      // 将文件的扩展名替换成 js
        .map(item => replaceExt(item, '.js'))
        // 把绝对路径转换成相对于 context 的路径
        .map(item => path.relative(context, item))
        // 应用每一个入口文件，就像手动配置的那样
        // 'app'              : './app.js',
        // 'pages/index/index': './pages/index/index.js',
        // 'pages/logs/logs'  : './pages/logs/logs.js',
        .forEach(item => itemToPlugin(context, './' + item, replaceExt(item, '')).apply(compiler))
      // 返回 true 告诉 webpack 内置插件就不要处理入口文件了，因为这里已经处理了
      return true
    })
  }
}

module.exports = MinaWebpackPlugin
