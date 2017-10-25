const {readFile} = require('fs')
const writeFileAtomic = require('write-file-atomic')

module.exports = class File {
  constructor (path) {
    this.path = path
  }
  read () {
    return new Promise((resolve, reject) => {
      readFile(this.path, 'utf8', (err, content) => {
        if (err && err.code !== 'ENOENT') return reject(err)
        else {
          const value = Number(content)
          return resolve(isNaN(value) ? 0 : value)
        }
      })
    })
  }
  save (sequence) {
    return new Promise((resolve, reject) => {
      writeFileAtomic(this.path, `${sequence}`, 'utf8', (err) => {
        if (err) return reject(err)
        else return resolve(err)
      })
    })
  }
}
