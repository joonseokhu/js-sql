const mysql = require('mysql2/promise')

const pipe = (...fns) => (
  (value) => (
    fns.reduce((prev, fn) => fn(prev), value)
  )
)

const setKey = (root, keys, value) => {
  let node = root
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const isLeaf = (i === (keys.length - 1))
    const hasKey = Object.prototype.hasOwnProperty.call(node, key)
    if (isLeaf) {
      node[key] = value
      break
    }
    if (!hasKey) {
      node[key] = {}
    }
    node = node[key]
  }
}

const sanitizeStr = pipe(
  e => e.replace(/\\/g, '\\\\'),
  e => e.replace(/'/g, '\\\''),
  e => e.replace(/"/g, '\\\"'),
  e => `'${e}'`,
)

const sanitizeObj = pipe(
  e => JSON.stringify(e),
  sanitizeStr,
)

const sanitizeValue = (value) => {
  switch (typeof value) {
    case 'string': return sanitizeStr(value);
    case 'boolean': return value ? 'true' : 'false';
    case 'number': return value.toString();
    case 'object': return (value === null) ? 'null' : sanitizeObj(value);
    case 'undefined': return 'null'
    default: return ''
  }
}

const insert = (table, obj) => {
  const keys = [];
  const values = [];
  const pairs = Object.entries(obj)
  for (const pair of Object.entries(obj)) {
    const [key, value] = pair
    keys.push(key)
    values.push(sanitizeValue(value))
  }
  return `insert into ${table} (
    ${keys.join(',\n    ')}
) values (
    ${values.join(',\n    ')}
)`
}

const select = (obj) => {
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
      return ret.push(`${sanitizeValue(value)} as '${keys.join('.')}'`)
    })
  }

  formatSelects(obj)

  console.log(ret)
  
  // const selects = Object.entries(obj).map(([key, value]) => {
  //   if (typeof value === 'string') return `${value} as '${key}'`
  //   if (typeof value === 'object') {
  //     Object.entries(value)
  //     return `${value} as '${key}'`
  //   }
  //   return `${value} as '${key}'`
  // })
  
  return `select
    ${ret.join(',\n    ')}
`
}

const formatResult = (rows) => rows.map((row) => {
  const ret = {}
  for(const [key, value] of Object.entries(row)) {
    const keys = key.split('.')
    setKey(ret, keys, value)
  }
  return ret
})

module.exports = {
  insert,
  select,
  formatResult,
}