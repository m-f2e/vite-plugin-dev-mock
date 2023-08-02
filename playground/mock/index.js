const books = require('./book')
const toys = require('./toys')
const routeModules = [ books, toys ]

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

for (const routeModule of routeModules) {
  for (const routeKey in routeModule) {
    apiRoutes.push(routeModule[routeKey])
  }
}
console.log('$---', apiRoutes);

module.exports = apiRoutes