# vite-plugin-dev-mock
为开发环境提供 mock 接口服务插件

# 安装
```shell
npm install @m-f2e/vite-plugin-dev-mock -D
``` 

# 使用
1. 在项目根目录下创建`mock`文件夹, 新建`index.js`或者`index.mjs`作为入口文件
```js
// index.js
const apiRoutes = [
  {
    url: '/api/users',
    type: 'get',
    response: (req, res) => {
      res.send(
        [
          { id: 1, name: '张三', age: 18 },
          { id: 2, name: '李四', age: 19 },
          { id: 3, name: '王五', age: 20 },
        ]
     )
    }
  }
]

module.exports = apiRoutes
```
```js
// index.mjs
const apiRoutes = [
  {
    url: '/pai/users',
    type: 'get',
    response: (req, res) => {
       res.send(
        [
          {  id: 1, name: '张三', age: 18 },
          { id: 2, name: '李四', age: 19 },
          { id: 3, name: '王五', age: 20 },
        ]
     )
    }
  }
]

export default apiRoutes
```
2. 修改`vite.config.ts`
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginDevMock from '@m-f2e/vite-plugin-dev-mock'

export default defineConfig({
  plugins: [
    vue(), 
    // 默认为./mock/index.js
    VitePluginDevMock()
    // 或者自定义目录
    VitePluginDevMock({ entry: './mock/index.js' })
  ],
})
```