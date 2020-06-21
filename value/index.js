const { pipe } = require('../utils/fp')

const toString = pipe(
  (e) => String(e),
  (e) => e.replace(/\\/g, '\\\\'),
  (e) => e.replace(/'/g, '\\\''),
  (e) => e.replace(/"/g, '\\"'),
  (e) => e.replace(/`/g, '\\`'),
  (e) => `'${e}'`,
)

const toObject = (value) => ((value === null)
  ? 'null'
  : pipe(
    (e) => JSON.stringify(e),
    toString,
  ))

const toBoolean = (value) => (value ? 'true' : 'false')

const toNumber = (value) => {
  const num = Number(value)
  if (Number.isNaN(num)) return '0'
  return num.toString()
}

const toValue = (value) => {
  if (value === null) return 'null'
  switch (typeof value) {
    case 'string': return toString(value)
    case 'boolean': return toBoolean(value)
    case 'number': return toNumber(value)
    case 'object': return toObject(value)
    default: return 'null'
  }
}

module.exports = Object.assign(toValue, {
  string: toString,
  object: toObject,
  boolean: toBoolean,
  number: toNumber,
})
