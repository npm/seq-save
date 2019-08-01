# seq-save

Save [CouchDB sequence #s](http://docs.couchdb.org/en/2.1.1/api/database/changes.html#changes-feeds) to a configurable backend. This allows you to resume CouchDB replication from the point where you left off.

_see also: [changes-stream](https://www.npmjs.com/package/changes-stream)._

This is a replacement to [`seq-file`](https://github.com/npm/seq-file), adding
support for additional backends.

## API

* _SeqSave(`path`, `opts`)_: where `path` is the path on disk to save the file
  to or the key to use for an alternative backend, such as etcd. Returns a new
  sequence saving instance.
* _`<Promise>` save.save(`sequence`)_: save the `sequence` to the configured backend.
  Returns a Promise which will resolve once the value is saved.
* _`<Promise>` save.read()_: Returns a Promise that will resolve with the
  current sequence #.

## Backends

### File (Default)

To save sequence files to the filesystem, simply provide the following
configuration:

```js
const SeqSave = require('seq-save')
const seq = new SeqSave('my-sequence.seq', {
  type: 'file'
})
```

_It's worth noting that `file` is the default backend, so you can also
 simply provide an empty configuration object._.

### etcd

To save sequence files to etcd, simply provide the following configuration:

NOTE: if you specify a path in the etcd backend that begins with a leading dot character `.`, it will be removed.

```js
const Save = require('seq-save')
const seq = new SeqSave('my-sequence.seq', {
  type: 'etcd',
  host: 'http://127.0.0.1:2379'
})
```
