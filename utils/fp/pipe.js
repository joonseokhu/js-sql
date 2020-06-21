const pipe = (...fns) => (value) => fns.reduce((prev, fn) => fn(prev), value)

const log = (message) => (value) => {
  console.log(message, value)
  return value
}

module.exports = Object.assign(pipe, {
  log,
})
