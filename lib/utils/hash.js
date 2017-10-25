const crypto = require('crypto')

module.exports = function (path) {
  return crypto
    .createHash('sha256')
    .update(path, 'utf8')
    .digest('base64')
}
