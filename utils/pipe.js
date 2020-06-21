const pipe = (...fns) => (
  (value) => (
    fns.reduce((prev, fn) => fn(prev), value)
  )
)

module.exports = {
  pipe,
}
