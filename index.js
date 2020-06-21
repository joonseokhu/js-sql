const mysql = require('mysql2/promise')

const { pipe } = require('./utils/pipe')
const setKey = require('./utils/setKey')
const toValue = require('./value')

const insert = (table, input) => {
  const keys = [];
  const values = [];
  Object.entries(input).forEach(([key, value]) => {
    keys.push(key)
    values.push(toValue(value))
  })
  return `insert into ${table} (
    ${keys.join(',\n    ')}
) values (
    ${values.join(',\n    ')}
)`
}

const select = (input) => {
  const ret = []
  const formatSelects = (obj, root = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const keys = [...root, key]
      const type = typeof value;
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

module.exports = {
  insert,
  select,
  where,
  formatResult,
  value: toValue,
}
