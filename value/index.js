const moment = require('moment-timezone')

const { pipe } = require('../utils/fp')

const isVoid = (value) => (value === null || value === undefined)

const ToValue = (format) => (value, defaultValue = null) => {
  if (isVoid(value)) return isVoid(defaultValue) ? 'null' : format(defaultValue)
  return format(value)
}

const toString = ToValue(pipe(
  (e) => String(e),
  (e) => e.replace(/\\/g, '\\\\'),
  (e) => e.replace(/'/g, '\\\''),
  (e) => e.replace(/"/g, '\\"'),
  (e) => e.replace(/`/g, '\\`'),
  (e) => `"${e}"`,
))

const toBoolean = ToValue((e) => !!e)

const toNumber = ToValue(pipe(
  String,
  (e) => e.replace(/[^\d.-]/g, ''),
  Number,
))

const toDate = ToValue(pipe(
  (e) => moment(e).format('YYYY-MM-DD HH:mm:ss'),
  toString,
))

const toValue = (value) => {
  if (value === null) return 'null'
  switch (typeof value) {
    case 'string': return toString(value)
    case 'boolean': return toBoolean(value)
    case 'number': return toNumber(value)
    default: return 'null'
  }
}

module.exports = Object.assign(toValue, {
  string: toString,
  boolean: toBoolean,
  number: toNumber,
  date: toDate,
})
