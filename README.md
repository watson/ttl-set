# ttl-set

Like a JavaScript Set, but with a TTL on entries

## Installation

```sh
npm install ttl-set --save
```

## Usage

```js
const TTLSet = require('ttl-set')

const cache = new TTLSet(60 * 1000) // TTL: 1 minute

cache.add('hello')
// ...wait 40 seconds...
cache.add('world')
// ...wait 40 seconds...
console.log(cache.has('hello')) // => false
console.log(cache.has('world')) // => true
// ...wait 40 seconds...
console.log(cache.has('world')) // => false
```

## API

### `TTLSet(ttl)` constructor

Create a new instance of the TTLSet.
Takes `ttl` as a required argument,
which is the number of milliseconds for elements to live in the TTLSet before evicting them.

### `TTLSet.prototype.add(value)`

Adds the given `value` to the TTLSet.

### `TTLSet.prototype.clear()`

Clear all previously added values to the TTLSet.

### `TTLSet.prototype.has(value)`

Returns `true` if the TTLSet contains the given `value`. Returns `false` otherwise.

### `TTLSet.prototype.size`

The number of elements in the TTLSet.

## License

MIT