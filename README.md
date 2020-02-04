# Q
- main.js 为什么消失了
- webpack 构建流程源码
- watch 模式部分 

## runtime
- 这是因为小程序和 web 应用不一样，web 应用可以通过 <script> 标签引用 runtime.js，然而小程序却不能这样。
  我们必须让其它模块感知到 runtime.js 的存在，因为 runtime.js 里面是个立即调用函数表达式，所以只要导入 runtime.js 即可。
  MinaRuntimePlugin 做的就是这个事情，在每个 js 前面加上 `;require('./../../runtime')`
 
 ## 其他
 ### tree shaking
 - https://webpack.docschina.org/guides/tree-shaking/
 - https://juejin.im/post/5a4dc842518825698e7279a9#heading-0
 - https://juejin.im/post/5a4dca1d518825128654fa78

https://juejin.im/post/5d00aa5e5188255a57151c8a#heading-12

## 任务
- 完善 usingComponents，MinaWebpackPlugin 处理 usingComponents 路径有问题，查看源码解决
