import path from 'path'
import type { IncomingMessage } from 'http'
import type { UserOptions, MockRoute, MockHandlerRoute, MockServerResponse } from './typing'
import { ViteDevServer } from 'vite'

// {get: [{url: '/api/get', method: 'get', handler: function}], post: [{url: '/api/post', method: 'post', handler: function}]}
const mockRouteMap: {
  [key: string]: MockHandlerRoute[]
} = {}

// 读取mock接口配置
const getMockRoutesObj = async (entry: string) => {
  const entryExt = path.extname(entry)
  if (!['.mjs', '.js'].includes(entryExt)) {
    return []
  } 
  let mockObj;
  if (entryExt === '.mjs') {
    const importData = await import(entry)
    mockObj = importData.default
  } else if (entryExt === '.js') {
    mockObj = require(entry)
  }
  return mockObj
}

// 根据mock接口配置生成路由映射 
const generateRouteMap = (mockRoutes: MockRoute[]) => {
  mockRoutes.forEach(mockRoute => {
    const method = (mockRoute.type || 'get').toLowerCase()
    const route: MockHandlerRoute = {
      path: mockRoute.url,
      method,
      handler: mockRoute.response
    }
    // 没有路由映射进行初始化
    if (!mockRouteMap[method]) {
      mockRouteMap[method] = []
    }
    mockRouteMap[method].push(route)
  })
}

// 匹配请求路由
const matchRoute = (req: IncomingMessage) => {
  const url = req.url
  const method = req.method?.toLowerCase()
  if (!method) {
    return null
  }
  // 查找路由映射表
  const routeList = mockRouteMap[method]
  return routeList.find(route => {
    return route.path === url
  })
}

const VitePluginDevMock = (options?: UserOptions) => {
  let entry = options?.entry || './mock/index.ts'

  // 没有绝对路径转为绝对路径
  if (!path.isAbsolute(entry)) {
    entry = path.resolve(process.cwd(), entry)
  }

  return {
    name: 'vite-plugin-dev-mock',
    apply: 'serve',
    configureServer: async (server: ViteDevServer) => {
      // 获取路由配置信息
      const mockRoutesObj = await getMockRoutesObj(entry);
      if (!mockRoutesObj) {
        return
      }
      // 生成路由映射
      generateRouteMap(mockRoutesObj)
      // 添加中间件
      server.middlewares.use((req, res, next) => {
        // 匹配路由
        const route = matchRoute(req)
        if (!route) {
          return next()
        }
        // 对匹配到的路由进行处理
        const newRes = res as MockServerResponse
        newRes.send = (body: object) => {
          let chunk: string | Buffer = JSON.stringify(body)
          if (chunk) {
            chunk = Buffer.from(chunk, 'utf-8')
            newRes.setHeader('Content-Length', chunk.length)
          }
          newRes.setHeader('Content-Type', 'application/json')
          newRes.statusCode = 200
          newRes.end(chunk)
        }
        route.handler(req, newRes)
      })
    }
  }
}

export {
  VitePluginDevMock
}

export default VitePluginDevMock