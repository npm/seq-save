/* global describe, it, beforeEach */

const {readFileSync, unlinkSync} = require('fs')
const etcd = require('etcdjs')(['http://127.0.0.1:2379'])
const hash = require('../lib/utils/hash')

const expect = require('chai').expect
require('chai').should()

const SeqSave = require('../')

describe('seq-save', () => {
  it('throws exeption if backend does not exist', () => {
    expect(() => {
      SeqSave('./test/fixtures/missing', {
        type: 'not-a-backend-type'
      })
    }).to.throw(/does not exist/)
  })

  describe('file', () => {
    describe('read', () => {
      it('defaults to 0 if path is not found', () => {
        const seq = SeqSave('./test/fixtures/missing')
        return seq.read()
          .then(value => {
            value.should.equal(0)
          })
      })

      it('reads value from sequence file', () => {
        const seq = SeqSave('./test/fixtures/sequence')
        return seq.read()
          .then(value => {
            value.should.equal(99)
          })
      })
    })

    describe('write', () => {
      it('writes sequence to file', () => {
        const path = './test/fixtures/sequence-2'
        const seq = SeqSave(path)
        return seq.save(394)
          .then(() => {
            const value = Number(readFileSync(path))
            value.should.equal(394)
            unlinkSync(path)
          })
      })
    })
  })

  describe('etcd', () => {
    const p1 = hash('./.sequence-1')
    const p2 = hash('.sequence-2')

    beforeEach((done) => {
      etcd.del(p1, (_err) => {
        etcd.del(p2, () => {
          return done()
        })
      })
    })

    it('saves and fetches sequence from etcd', () => {
      const seq = SeqSave(p1, {
        type: 'etcd',
        hosts: 'http://127.0.0.1:2379'
      })
      return seq.save(1024)
        .then(() => seq.read())
        .then(value => {
          value.should.equal(1024)
        })
    })

    it('defaults to 0 if key does not exist', () => {
      const seq = SeqSave(p2, {
        type: 'etcd',
        hosts: 'http://127.0.0.1:2379'
      })
      return seq.read()
        .then(value => {
          value.should.equal(0)
        })
    })
  })
})
