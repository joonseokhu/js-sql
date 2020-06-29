const mysql = require('mysql2/promise')
const chalk = require('chalk')

const setKey = require('./utils/setKey')
const toValue = require('./value')

const serializeString = (str) => str
  .split('\n')
  .map((e) => e.trim())
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim()

const showQuery = (query) => {
  console.log(`\n${chalk.cyan(serializeString(query))}\n`)
}

// const displayQuery = (query, values) => {
//   const result = query
//     .split('?')
//     .map((queryStr, i, arr) => ((i + 1 === arr.length)
//       ? queryStr
//       : queryStr + toValue(values[i])))
//     .join('')

//   console.log(`\n${chalk.cyan(result)}\n`)

//   return result
// }

// const Insert = (connection) => (table, input = {}, duplicates = {}) => {
//   const keys = []
//   const values = []
//   const dupKeys = []

//   Object.entries(input).forEach(([key, value]) => {
//     keys.push(key)
//     values.push(value)
//   })

//   Object.entries(duplicates).forEach(([key, value]) => {
//     dupKeys.push(key)
//     values.push(value)
//   })

//   const query = serializeString(`
//     INSERT INTO ${table} (
//       ${keys.join(', ')}
//     ) VALUES (
//       ${keys.map(() => '?').join(', ')}
//     )
//     ${dupKeys.length ? `
//       ON DUPLICATE KEY UPDATE
//       ${dupKeys.map((key) => (`${key} = ?`)).join(', ')}
//     ` : ''}
//   `)

//   displayQuery(query, values)

//   return connection.query(query, values)
// }

const insert = (table, input, duplicates) => {
  const keys = []
  const values = []
  Object.entries(input).forEach(([key, value]) => {
    keys.push(key)
    values.push(toValue(value))
  })
  const dups = Object.entries(duplicates)
  const query = serializeString(`INSERT INTO ${table} (
    ${keys.join(',\n    ')}
  ) VALUES (
    ${values.join(',\n    ')}
  )
  ${dups.length ? `
    ON DUPLICATE KEY UPDATE
    ${dups.map(([key, value]) => (
    `${key} = ${toValue(value)}`
  ))}
  ` : ''}`)

  showQuery(query)

  return query
}

const select = (input) => {
  const ret = []
  const formatSelects = (obj, root = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const keys = [...root, key]
      const type = typeof value
      if (typeof value === 'object' && value !== null) {
        return formatSelects(value, keys)
      }
      if (type === 'string') {
        return ret.push(`${value} as '${keys.join('.')}'`)
      }
      return ret.push(`${toValue(value)} as '${keys.join('.')}'`)
    })
  }

  formatSelects(input)

  return `select
    ${ret.join(',\n    ')}
  `
}

const where = (input) => {
  const wheres = Object.entries(input).map(([key, value]) => {
    console.log()
    return `${key} = ${value}`
  })

  return `where
    ${wheres.join(',\n    ')}
  `
}

const formatResult = (rows) => rows.map((row) => {
  const ret = {}
  Object.entries(row).forEach(([key, value]) => {
    const keys = key.split('.')
    setKey(ret, keys, value)
  })
  return ret
})

// const init = (connectionInfo) => {
//   const pool = mysql.createPool(connectionInfo)

//   const insert = Insert(pool)

//   return Object.assign(pool, {
//     insert,
//   })
// }

module.exports = {
  // init,
  insert,
  select,
  where,
  formatResult,
  value: toValue,
}
