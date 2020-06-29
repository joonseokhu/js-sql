const create = (length) => {
  const len = Number(length)
  if (Number.isNaN(len)) return []
  return [...Array(len).keys()]
}

const map = (fn) => (arr) => arr.map(fn)

const filter = (fn) => (arr) => arr.filter(fn)

const slice = (from, to) => (arr) => arr.slice(from, to)

const join = (sep) => (arr) => arr.join(sep)

const reduce = (fn, init) => (arr) => arr.reduce(fn, init)

const sort = (fn) => (arr) => [...arr].sort(fn)

const reverse = (flag) => (arr) => (flag ? [...arr].reverse() : arr)

const shuffle = () => (arr) => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
  }
  return newArr
}

module.exports = {
  create,
  map,
  filter,
  slice,
  join,
  reduce,
  sort,
  reverse,
  shuffle,
}
