const moment = require('moment-timezone')
const mysql = require('mysql2/promise')
const sql = require('./index')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'testdb',
  database: 'testdb',
  password: 'TGkCpGQ37$HZxe',
})

// eslint-disable-next-line arrow-body-style
const test = (str) => {
  // console.log('- - - - - - - - - - - - - - - - -\n')
  console.log(str)
  return connection.query(str)
    .then(([res]) => {
      console.log('success')
      console.log(res)
      // const result = sql.formatSelected(res)
      // console.log(result)
      // return result
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return []
    })
}

test(`
  ${sql.insert('article', [
    {
      title: '1',
      user_id: 0,
      content: null,
      created_at: '2018-05-05',
    }, {
      title: '2',
      user_id: 0,
      content: null,
      created_at: '2018-05-05',
    }, {
      title: '3sd',
      user_id: 0,
      content: null,
      created_at: '2018-05-05',
    }, {
      title: '145',
      user_id: 110,
      content: null,
      created_at: '2018-05-05',
    }, {
      title: '15fdsa',
      user_id: sql.value.number('-234,12,45.435'),
      content: null,
      created_at: '2018-05-05',
    }, {
      title: 'sdfsa1',
      user_id: 1100,
      content: null,
      created_at: '2018-05-05',
    },
  ].map((e) => ({
    title: sql.value.string(e.title),
    user_id: sql.value.number(e.user_id),
    content: sql.value.string(e.content),
    created_at: sql.value.date(e.created_at),
  })))}
`)

// test(`
//   ${sql.insert('foo', {
//     foo: '1',
//     bar: 0,
//     baz: null,
//   })}
// `)

// null, 타입에러, duplicate

// const foo = 'test5'
// test(sql.insert('user', {
//   username: foo,
//   password: '1234',
//   email: `${foo}@test.com`,
//   name: null,
//   // phonenumber: sql.value.number(e),
// }))

// const now = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')

// const pool = sql.init({
//   host: 'localhost',
//   user: 'testdb',
//   database: 'testdb',
//   password: 'TGkCpGQ37$HZxe',
// })

// pool.insert('user', {
//   username: 'test1',
//   email: 'test01@test.com',
//   password: '1234',
// }, {
//   email: 'test002@test.com',
// })

// pool.update

// test(sql.insert('article', {
//   user_id: 40,
//   title: `제목 ${now} " \" \\"  ' \'  \\'  \` \\\` ; \; >`, // 인젝션 테스트
//   content: `내용 ${now}`,
// }, {
//   title: 'ddd',
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

// test(`${sql.select({
//   id: 'article.id',
//   title: 'article.title',
//   content: 'article.content',
//   article_user_id: 'article.user_id',
//   users: {
//     id: 'user.id',
//     username: 'user.username',
//     foo: sql.value.string('user.username'),
//     bar: sql.value.string('  \'  "  \\  '),
//   },
// })}
// from article
// left join user on article.user_id = user.id
// ${sql.where({
//     'user.id': 40,
//   })}
//   LIMIT 4
// `)
