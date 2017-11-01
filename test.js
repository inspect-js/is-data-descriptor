'use strict';

require('mocha');
var assert = require('assert');
var isDescriptor = require('./');
var noop = function() {};

describe('isDescriptor', function() {
  describe('value type', function() {
    it('should be false when not an object:', function() {
      assert(!isDescriptor('a'));
      assert(!isDescriptor(null));
      assert(!isDescriptor([]));
    });
  });

  describe('data descriptor:', function() {
    it('should not be false when the object has invalid properties:', function() {
      assert(isDescriptor({value: 'foo', bar: 'baz'}));
      assert(isDescriptor({value: 'foo', bar: 'baz'}));
      assert(isDescriptor({value: 'foo', get: noop}));
      assert(isDescriptor({get: noop, value: noop}));
    });

    it('should be true when the object has valid data-descriptor properties', function() {
      assert(isDescriptor({value: 'foo'}));
      assert(isDescriptor({value: noop}));
    });

    it('should be false when valid properties are invalid types', function() {
      assert(!isDescriptor({value: 'foo', enumerable: 'foo'}));
      assert(!isDescriptor({value: 'foo', configurable: 'foo'}));
      assert(!isDescriptor({value: 'foo', writable: 'foo'}));
    });

    it('should be true when a value is a valid data descriptor', function() {
      assert(isDescriptor({value: 'foo'}));
      assert(isDescriptor({writable: true}));
      assert(isDescriptor({value: 'foo', get: 'foo'}));
    });

    it('should be false when the value is not a valid descriptor', function() {
      assert(!isDescriptor('foo'));
      assert(!isDescriptor({}));
      assert(!isDescriptor({configurable: true}));
      assert(!isDescriptor({enumerable: true}));
      assert(!isDescriptor({
        get: undefined,
        set: undefined,
        enumerable: true,
        configurable: true
      }));
    });
  });
});
