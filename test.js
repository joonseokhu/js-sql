const mysql = require('mysql2/promise')
const sql = require('./index')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'testdb',
  database: 'testdb',
  password: 'TGkCpGQ37$HZxe',
})

const test = (str) => {
  console.log('- - - - - - - - - - - - - - - - -\n')
  console.log(str)
  return connection.query(str)
    .then(([res]) => {
      console.log('success')
      const result = sql.formatResult(res)
      console.log(result)
      return result
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return []
    })
}

// const foo = 'test5'
// test(sql.insert('user', {
//   username: foo,
//   password: '1234',
//   email: `${foo}@test.com`,
//   name: null
// }))

// test(sql.insert('article', {
//   user_id: 40,
//   title: '제목8',
//   content: '내용내용내용',
// }))

// test(`${sql.select({
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

test(`${sql.select({
  id: 'article.id',
  title: 'article.title',
  content: 'article.content',
  article_user_id: 'article.user_id',
  user: {
    id: 'user.id',
    username: 'user.username',
    foo: sql.value.string('user.username'),
    bar: sql.value.string('  \'  "  \\  '),
  },
})}
from article
left join user on article.user_id = user.id
${sql.where({
    'user.id': 40,
  })}
`)
