
'use strict'

const etcdjs = require('etcdjs')
const hash = require('../utils/hash')

module.exports = class Etcd {
  constructor (path, opts) {
    this.path = hash(path)
    this.etcd = etcdjs(opts.hosts.split(','))
  }
  read () {
    return new Promise((resolve, reject) => {
      this.etcd.get(this.path, (err, resp) => {
        if (err) return reject(err)
        else {
          const value = Number(resp ? resp.node.value : 0)
          return resolve(isNaN(value) ? 0 : value)
        }
      })
    })
  }
  save (sequence) {
    return new Promise((resolve, reject) => {
      this.etcd.set(this.path, `${sequence}`, (err) => {
        if (err) return reject(err)
        else return resolve()
      })
    })
  }
}
