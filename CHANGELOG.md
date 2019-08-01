# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/npm/seq-save/compare/v1.0.1...v2.0.0) (2019-08-01)


### Bug Fixes

* remove leading dot from paths in etcd backend ([c5109c8](https://github.com/npm/seq-save/commit/c5109c8))


### Features

* stop using hashes for paths in etcd backend ([524efc8](https://github.com/npm/seq-save/commit/524efc8))


### BREAKING CHANGES

* deploying updates containing this change will result in
followers that currently use the etcd backend to reset to their original
state due to the change in where the sequence is stored



<a name="1.0.1"></a>
## [1.0.1](https://github.com/npm/seq-save/compare/v1.0.0...v1.0.1) (2017-10-25)



<a name="1.0.0"></a>
# 1.0.0 (2017-10-25)


### Features

* first pass at seq-save functionality ([c8d502d](https://github.com/npm/seq-save/commit/c8d502d))
