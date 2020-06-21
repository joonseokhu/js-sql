const setKey = (root, keys, value) => {
  let node = root
  for (let i = 0; i < keys.length; i += 1) {
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

module.exports = setKey
