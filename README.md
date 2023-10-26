# is-data-descriptor [![NPM version](https://img.shields.io/npm/v/is-data-descriptor.svg)](https://www.npmjs.com/package/is-data-descriptor) [![Build Status](https://img.shields.io/travis/jonschlinkert/is-data-descriptor.svg)](https://travis-ci.org/jonschlinkert/is-data-descriptor)

> Returns true if a value has the characteristics of a valid JavaScript data descriptor.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i is-data-descriptor --save
```

## Usage

```js
var isDataDesc = require('is-data-descriptor');
var assert = require('assert');
```

## Examples

`true` when the descriptor has valid properties with valid values.

```js
// `value` can be anything
assert.equal(isDataDesc({ value: 'foo' }), true);
assert.equal(isDataDesc({ value() {} }), true);
assert.equal(isDataDesc({ value: true }), true);
```

`false` when not an object

```js
assert.equal(isDataDesc('a'), false);
assert.equal(isDataDesc(null), false);
assert.equal(isDataDesc([]), false);
```

`false` when the object has invalid properties

```js
assert.equal(isDataDesc({ value: 'foo', bar: 'baz' }), false);
assert.equal(isDataDesc({ value: 'foo', bar: 'baz' }), false);
assert.equal(isDataDesc({ value: 'foo', get() {} }), false);
assert.equal(isDataDesc({ get() {}, value: 'foo' }), false);
```

`false` when a value is not the correct type

```js
assert.equal(isDataDesc({ value: 'foo', enumerable: 'foo' }), false);
assert.equal(isDataDesc({ value: 'foo', configurable: 'foo' }), false);
assert.equal(isDataDesc({ value: 'foo', writable: 'foo' }), false);
```

## Valid properties

The only valid data descriptor properties are the following:

* `configurable` (required)
* `enumerable` (required)
* `value` (optional)
* `writable` (optional)

To be a valid data descriptor, either `value` or `writable` must be defined.

**Invalid properties**

A descriptor may have additional _invalid_ properties (an error will **not** be thrown).

```js
var foo = {};

Object.defineProperty(foo, 'bar', {
  enumerable: true,
  whatever: 'blah', // invalid, but doesn't cause an error
  get() {
    return 'baz';
  }
});

assert.equal(foo.bar, 'baz');
```

## Related projects

* [is-accessor-descriptor](https://www.npmjs.com/package/is-accessor-descriptor): Returns true if a value has the characteristics of a valid JavaScript accessor descriptor. | [homepage](https://github.com/jonschlinkert/is-accessor-descriptor)
* [is-descriptor](https://www.npmjs.com/package/is-descriptor): Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for… [more](https://www.npmjs.com/package/is-descriptor) | [homepage](https://github.com/jonschlinkert/is-descriptor)
* [isobject](https://www.npmjs.com/package/isobject): Returns true if the value is an object and not an array or null. | [homepage](https://github.com/jonschlinkert/isobject)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/is-data-descriptor/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.