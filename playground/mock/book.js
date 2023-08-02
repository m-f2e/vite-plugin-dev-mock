exports.books = {
  url: '/api/books',
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

exports.bookLists = {
  url: '/api/bookLists',
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
