# level-supports

> **Create a manifest describing the abilities of a [`levelup`](https://github.com/Level/levelup) or [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) db.**

[![level badge][level-badge]](https://github.com/Level/awesome)
[![npm](https://img.shields.io/npm/v/level-supports.svg)](https://www.npmjs.com/package/level-supports)
[![Node version](https://img.shields.io/node/v/level-supports.svg)](https://www.npmjs.com/package/level-supports)
[![Test](https://img.shields.io/github/workflow/status/Level/supports/Test?label=test)](https://github.com/Level/supports/actions/workflows/test.yml)
[![Coverage](https://img.shields.io/codecov/c/github/Level/supports?label=&logo=codecov&logoColor=fff)](https://codecov.io/gh/Level/supports)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript&logoColor=fff)](https://standardjs.com)
[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)
[![Donate](https://img.shields.io/badge/donate-orange?logo=open-collective&logoColor=fff)](https://opencollective.com/level)

## Usage

```js
const supports = require('level-supports')

db.supports = supports({
  bufferKeys: true,
  additionalMethods: {
    approximateSize: true
  }
})
```

Receivers of the db can then use it like so:

```js
if (!db.supports.permanence) {
  throw new Error('Persistent storage is required')
}

if (db.supports.bufferKeys && db.supports.promises) {
  await db.put(Buffer.from('key'), 'value')
}
```

## API

### `manifest = supports([manifest, ..])`

Given zero or more manifest objects, returns a merged and enriched manifest object that has:

- Truthy properties for each of the features listed below
- An `additionalMethods` object

For future extensibility, the properties are truthy rather than strictly typed booleans. Falsy or absent properties are converted to `false`, other values are allowed:

```js
supports().streams // false
supports({ streams: true }).streams // true
supports({ streams: {} }).streams // {}
supports({ streams: 1 }, { streams: 2 }).streams // 2
```

For consumers of the manifest this means they should check support like so:

```js
if (db.supports.streams)
```

Rather than:

```js
if (db.supports.streams === true)
```

**Note:** the manifest describes high-level features that typically encompass multiple methods of a db. It is currently not a goal to describe a full API, or versions of it.

## Features

### `bufferKeys` (boolean)

Does the db support [Buffer](https://nodejs.org/api/buffer.html) keys? May depend on runtime environment as well. Does _not_ include support of other binary types like typed arrays (which is why this is called `bufferKeys` rather than `binaryKeys`).

<details>
<summary>Support matrix</summary>

| Module               | Support |
| :------------------- | :------ |
| `abstract-leveldown` | ✅       |
| `leveldown`          | ✅       |
| `rocksdb`            | ✅       |
| `memdown`            | ✅       |
| `level-js`           | ✅       |
| `encoding-down`      | ✅       |
| `deferred-leveldown` | ✅       |
| `levelup`            | ✅       |
| `level-packager`     | ✅       |
| `level`              | ✅       |
| `level-mem`          | ✅       |
| `level-rocksdb`      | ✅       |
| `subleveldown`       | ✅       |
| `multileveldown`     | ✅       |
| `level-party`        | ✅       |

</details>

### `snapshots` (boolean)

Does the db have snapshot guarantees (meaning that reads are unaffected by simultaneous writes)? Must be `false` if any of the following is true:

- Reads don't operate on a [snapshot](https://github.com/Level/abstract-leveldown#iterator)
- Snapshots are created asynchronously.

<details>
<summary>Support matrix</summary>

| Module               | Snapshot guarantee          |
| :------------------- | :-------------------------- |
| `abstract-leveldown` | ✅                           |
| `leveldown`          | ✅                           |
| `rocksdb`            | ✅                           |
| `memdown`            | ✅                           |
| `level-js`           | ✅ (by buffering)            |
| `encoding-down`      | ✅                           |
| `deferred-leveldown` | ✅                           |
| `levelup`            | ✅                           |
| `level-packager`     | ✅                           |
| `level`              | ✅                           |
| `level-mem`          | ✅                           |
| `level-rocksdb`      | ✅                           |
| `subleveldown`       | ✅                           |
| `multileveldown`     | ✅ (unless `retry` is true)  |
| `level-party`        | ❌ (unless `retry` is false) |

</details>

### `permanence` (boolean)

Does data survive after process exit? Is `false` for e.g. [`memdown`](https://github.com/Level/memdown), typically `true`.

### `seek` (boolean)

Do iterators support [`seek(..)`](https://github.com/Level/abstract-leveldown/#iteratorseektarget)?

<details>
<summary>Support matrix</summary>

| Module               | Support        |
| :------------------- | :------------- |
| `abstract-leveldown` | ✅ 6.0.0        |
| `leveldown`          | ✅ 1.2.0        |
| `rocksdb`            | ✅ 1.0.0        |
| `memdown`            | ✅ 4.1.0        |
| `level-js`           | ❌              |
| `encoding-down`      | ✅ 6.1.0        |
| `deferred-leveldown` | ✅ 5.1.0        |
| `levelup`            | ✅ n/a          |
| `level-packager`     | ✅ n/a          |
| `level`              | ❌ (`level-js`) |
| `level-mem`          | ✅ 4.0.0        |
| `level-rocksdb`      | ✅ 1.0.0        |
| `subleveldown`       | ✅ 4.1.0        |
| `multileveldown`     | ❌              |
| `level-party`        | ❌              |

</details>

#### `clear` (boolean)

Does db support [`db.clear(..)`](https://github.com/Level/abstract-leveldown/#dbclearoptions-callback)?

<details>
<summary>Support matrix</summary>

See also [Level/community#79](https://github.com/Level/community/issues/79).

| Module               | Support | Optimized       |
| :------------------- | :------ | :-------------- |
| `abstract-leveldown` | ✅ 6.1.0 | n/a             |
| `leveldown`          | ✅ 5.2.0 | ❌               |
| `rocksdb`            | ✅ 4.1.0 | ❌               |
| `memdown`            | ✅ 5.0.0 | ❌               |
| `level-js`           | ✅ 5.0.0 | ✅ 5.0.0         |
| `encoding-down`      | ✅ 6.2.0 | n/a             |
| `deferred-leveldown` | ✅ 5.2.0 | n/a             |
| `levelup`            | ✅ 4.2.0 | n/a             |
| `level-packager`     | ✅ 5.0.3 | n/a             |
| `level`              | ✅ 6.0.0 | ❌ (`leveldown`) |
| `level-mem`          | ✅ 5.0.1 | ❌ (`memdown`)   |
| `level-rocksdb`      | ✅ 5.0.0 | ❌ (`rocksdb`)   |
| `subleveldown`       | ✅ 4.2.1 | n/a             |
| `multileveldown`     | ❌       | n/a             |
| `level-party`        | ❌       | n/a             |

</details>

### `status` (boolean)

Does db have a [`status`](https://github.com/Level/abstract-leveldown/#dbstatus) property? Currently available on `abstract-leveldown` implementations, but not `levelup`.

### `deferredOpen` (boolean)

Can operations like `db.put()` be called without explicitly opening the db? Like so:

```js
var db = level()
db.put('key', 'value', callback)
```

Rather than:

```js
var db = level()

db.open(function (err) {
  if (err) throw err
  db.put('key', 'value', callback)
})
```

_TBD: whether this also includes methods like `isOpen()` and `isClosed()`._

### `openCallback` (boolean)

Does the db constructor take a callback?

```js
var db = level(.., callback)
```

To the same effect as:

```js
var db = level()
db.open(.., callback)
```

### `createIfMissing`, `errorIfExists` (boolean)

Does `db.open(options, ..)` support these options?

<details>
<summary>Support matrix</summary>

| Module      | Support |
| :---------- | :------ |
| `leveldown` | ✅       |
| `rocksdb`   | ✅       |
| `memdown`   | ❌       |
| `level-js`  | ❌       |

</details>

### `promises` (boolean)

Do all db methods (that don't otherwise have a return value) support promises, in addition to callbacks? Such that, when a callback argument is omitted, a promise is returned:

```js
db.put('key', 'value', callback)
await db.put('key', 'value')
```

<details>
<summary>Support matrix</summary>

| Module               | Support              |
| :------------------- | :------------------- |
| `abstract-leveldown` | ❌ (except iterators) |
| `leveldown`          | ❌ (except iterators) |
| `rocksdb`            | ❌ (except iterators) |
| `memdown`            | ❌ (except iterators) |
| `level-js`           | ❌ (except iterators) |
| `encoding-down`      | ❌ (except iterators) |
| `deferred-leveldown` | ❌ (except iterators) |
| `levelup`            | ✅                    |
| `level-packager`     | ✅                    |
| `level`              | ✅                    |
| `level-mem`          | ✅                    |
| `level-rocksdb`      | ✅                    |
| `subleveldown`       | ❌                    |
| `multileveldown`     | ❌                    |
| `level-party`        | ❌                    |

</details>

### `streams` (boolean)

Does db have the methods `createReadStream`, `createKeyStream` and `createValueStream`, following the API currently documented in `levelup`?

<details>
<summary>Support matrix</summary>

| Module               | Support |
| :------------------- | :------ |
| `abstract-leveldown` | ❌       |
| `leveldown`          | ❌       |
| `rocksdb`            | ❌       |
| `memdown`            | ❌       |
| `level-js`           | ❌       |
| `encoding-down`      | ❌       |
| `deferred-leveldown` | ❌       |
| `levelup`            | ✅       |
| `level-packager`     | ✅       |
| `level`              | ✅       |
| `level-mem`          | ✅       |
| `level-rocksdb`      | ✅       |
| `subleveldown`       | ✅       |
| `multileveldown`     | ✅       |
| `level-party`        | ✅       |

</details>

### `encodings` (boolean)

Do all relevant db methods take `keyEncoding` and `valueEncoding` options?

_TBD: what this means for `*asBuffer` options._

<details>
<summary>Support matrix</summary>

| Module               | Support |
| :------------------- | :------ |
| `abstract-leveldown` | ❌       |
| `leveldown`          | ❌       |
| `rocksdb`            | ❌       |
| `memdown`            | ❌       |
| `level-js`           | ❌       |
| `encoding-down`      | ✅       |
| `deferred-leveldown` | ❌       |
| `levelup`            | ✅       |
| `level-packager`     | ✅       |
| `level`              | ✅       |
| `level-mem`          | ✅       |
| `level-rocksdb`      | ✅       |
| `subleveldown`       | ✅       |
| `multileveldown`     | ✅       |
| `level-party`        | ✅       |

</details>

### `getMany` (boolean)

Does the db have a `getMany(keys[, options][, callback])` method?

_At the time of writing this is a new feature, subject to change, zero modules support it._

### `keyIterator` (boolean)

Does the `db` have a `keys([options])` method that returns a key iterator? Also implies support of `iterator#mode`.

_At the time of writing this is a new feature, subject to change, zero modules support it._

### `valueIterator` (boolean)

Does the `db` have a `values([options])` method that returns a key iterator? Also implies support of `iterator#mode`.

_At the time of writing this is a new feature, subject to change, zero modules support it._

### `iteratorNextv` (boolean)

Do iterators have a `nextv(size[, options][, callback])` method?

_At the time of writing this is a new feature, subject to change, zero modules support it._

### `iteratorAll` (boolean)

Do iterators have a `all([options][, callback])` method?

_At the time of writing this is a new feature, subject to change, zero modules support it._

### `additionalMethods` (object)

In the form of:

```js
{
  foo: true,
  bar: true
}
```

Which says the db has two methods, `foo` and `bar`, that are not part of the `abstract-leveldown` interface. It might be used like so:

```js
if (db.supports.additionalMethods.foo) {
  db.foo()
}
```

For future extensibility, the properties of `additionalMethods` should be taken as truthy rather than strictly typed booleans. We may add additional metadata (see [#1](https://github.com/Level/supports/issues/1)).

## Install

With [npm](https://npmjs.org) do:

```
npm install level-supports
```

## Contributing

[`Level/supports`](https://github.com/Level/supports) is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [Contribution Guide](https://github.com/Level/community/blob/master/CONTRIBUTING.md) for more details.

## Donate

Support us with a monthly donation on [Open Collective](https://opencollective.com/level) and help us continue our work.

## License

[MIT](LICENSE)

[level-badge]: https://leveljs.org/img/badge.svg
