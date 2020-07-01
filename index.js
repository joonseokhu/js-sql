const chalk = require('chalk')

const setKey = require('./utils/setKey')
const toValue = require('./value')

const joinLines = (strs) => strs.join(',\n   ')

// eslint-disable-next-line arrow-body-style
const serializeString = (str) => str
  .split('\n')
  .map((e) => e.trim())
  .join('\n')
// .join(' ')
// .replace(/\s+/g, ' ')
// .trim()

// eslint-disable-next-line arrow-body-style
const showQuery = (query) => {
  // console.log(`${chalk.cyan(serializeString(query))}`)
  return query
}

const insert = (table = '', input = {}, duplicates = {}) => {
  const keys = []
  const values = []
  Object.entries(input).forEach(([key, value]) => {
    keys.push(key)
    values.push(toValue(value))
  })
  const dups = Object.entries(duplicates)
  const query = serializeString(`
  INSERT INTO ${table} (
    ${joinLines(keys)}
  ) VALUES (
    ${joinLines(values)}
  )
  ${dups.length ? `
    ON DUPLICATE KEY UPDATE
    ${dups.map(([key, value]) => (
    `${key} = ${toValue(value)}`
  ))}
  ` : ''}`)

  return showQuery(query)
}

const update = (table = '', input = {}) => {
  const pairs = Object.entries(input).map(([key, value]) => (
    `${key} = ${toValue(value)}`
  ))
  const query = serializeString(`
  UPDATE ${table} SET
    ${joinLines(pairs)}
  `)

  return showQuery(query)
}

const select = (input = {}) => {
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

  const query = serializeString(`
  SELECT
    ${joinLines(ret)}
  `)

  return showQuery(query)
}

const where = (input) => {
  const wheres = Object.entries(input).map(([key, value]) => {
    console.log()
    return `${key} = ${value}`
  })

  const query = serializeString(`
  WHERE
    ${joinLines(wheres)}
  `)

  return showQuery(query)
}

const formatSelected = (rows) => rows.map((row) => {
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
  update,
  select,
  where,
  formatSelected,
  value: toValue,
}
