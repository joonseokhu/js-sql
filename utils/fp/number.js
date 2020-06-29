const random = (left = 0, right = 0) => {
  const [from, to] = [left, right].sort((a, b) => a - b)
  const min = Math.ceil(from)
  const max = Math.floor(to)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const cutOff = (position = 0, method = 'round') => (value = 0) => {
  if (!['ceil', 'round', 'floor'].includes(method)) {
    throw new Error('Method is not a number fixer `ceil`, `round`, `floor`')
  }
  const $position = Number(position) || 0
  const $value = Number(value) || 0
  const factor = 10 ** $position
  const ret = (Math[method]($value / factor) * factor)

  const radix = ret.toString().split('.')[1]
  const expectedRadixLength = $position * -1

  if ($position < 0 && radix && radix.length > expectedRadixLength) {
    return Number(ret.toFixed(expectedRadixLength))
  }

  return ret
}

module.exports = {
  random,
  cutOff,
}
