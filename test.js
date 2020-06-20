const mysql = require('mysql2/promise')

const { insert, select, formatResult } = require('./index')

const test = (str) => {
  console.log([...Array(30).keys()].map(e => '\n').join(''))
  console.log(str)
  return connection.query(str)
  .then(([res]) => {
    console.log('success')
    const result = formatResult(res)
    console.log(result)
    return result
  })
  .catch(err => {
    console.log('error')
    console.log(err)
    return []
  })
}

const connection = mysql.createPool({
  host: 'localhost',
  user: 'testdb',
  database: 'testdb',
  password: 'TGkCpGQ37$HZxe',
})

// const foo = 'test5'
// test(insert('user', {
//   username: foo,
//   password: '1234',
//   email: `${foo}@test.com`,
//   name: null
// }))

// test(insert('article', {
//   user_id: 40,
//   title: '제목8',
//   content: '내용내용내용',
// }))

// test(`${select({
//   'user.id': 'index',
//   'user.username': 'id',
//   'user.created_at': 'createdAt'
// })}
// from user
// `).then(users => users.map(user => {
//   try {
//     console.log('~')
//     console.log(user.index)
//     console.log(user.id)
//     console.log(JSON.parse(user.id))
//   } catch (e) {
//     console.log(user.id)
//   }
//   return ''
// }))

test(`${select({
  id: 'article.id',
  title: 'article.title',
  content: 'article.content',
  article_user_id: 'article.user_id',
  user: {
    id: 'user.id',
    username: 'user.username',
    foo: undefined,
  },
})}
from article
left join user on article.user_id = user.id
`)