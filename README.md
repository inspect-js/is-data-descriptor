# is-data-descriptor [![NPM version](https://badge.fury.io/js/is-data-descriptor.svg)](http://badge.fury.io/js/is-data-descriptor)

> Returns true if a value appears to be a valid JavaScript data descriptor.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i is-data-descriptor --save
```

## Usage

```js
var isDataDesc = require('is-data-descriptor');
```

## Examples

`true` when the descriptor has valid properties with valid values.

```js
// `value` can be anything
isDataDesc({value: 'foo'})
isDataDesc({value: function() {}})
isDataDesc({value: true})
//=> true
```

`false` when not an object

```js
isDataDesc('a')
//=> false
isDataDesc(null)
//=> false
isDataDesc([])
//=> false
```

`false` when the object has invalid properties

```js
isDataDesc({value: 'foo', bar: 'baz'})
//=> false
isDataDesc({value: 'foo', bar: 'baz'})
//=> false
isDataDesc({value: 'foo', get: function(){}})
//=> false
isDataDesc({get: function(){}, value: 'foo'})
//=> false
```

`false` when a value is not the correct type

```js
isDataDesc({value: 'foo', enumerable: 'foo'})
//=> false
isDataDesc({value: 'foo', configurable: 'foo'})
//=> false
isDataDesc({value: 'foo', writable: 'foo'})
//=> false
```

## Related projects

* [is-accessor-descriptor](https://www.npmjs.com/package/is-accessor-descriptor): Returns true if a value is a valid JavaScript accessor descriptor. | [homepage](https://github.com/jonschlinkert/is-accessor-descriptor)
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

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 31, 2015._
