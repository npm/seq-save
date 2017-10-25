'use strict'

const backends = {
  file: require('./lib/backends/file'),
  etcd: require('./lib/backends/etcd')
}

module.exports = function (path, opts) {
  opts = opts || {}
  const type = opts.type || 'file'
  if (!backends[type]) {
    throw Error(`backend ${type} does not exist`)
  } else {
    return new backends[type](path, opts)
  }
}
