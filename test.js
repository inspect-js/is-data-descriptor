'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var isDescriptor = require('./');
var noop = function(){};

describe('isDescriptor', function () {
  describe('value type', function () {
    it('should be false when not an object:', function () {
      assert(!isDescriptor('a'));
      assert(!isDescriptor(null));
      assert(!isDescriptor([]));
    });
  });

  describe('data descriptor:', function () {
    it('should be false when the object has invalid properties:', function () {
      assert(!isDescriptor({value: 'foo', bar: 'baz'}));
      assert(!isDescriptor({value: 'foo', bar: 'baz'}));
      assert(!isDescriptor({value: 'foo', get: noop}));
      assert(!isDescriptor({get: noop, value: noop}));
    });

    it('should be true when the object has valid properties:', function () {
      assert(isDescriptor({value: 'foo'}));
      assert(isDescriptor({value: noop}));
    });

    it('should be false when a value is not the correct type:', function () {
      assert(!isDescriptor({value: 'foo', enumerable: 'foo'}));
      assert(!isDescriptor({value: 'foo', configurable: 'foo'}));
      assert(!isDescriptor({value: 'foo', writable: 'foo'}));
    });
  });
});
