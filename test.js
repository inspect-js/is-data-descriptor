'use strict';

require('mocha');
const assert = require('assert');
const isDescriptor = require('./');
const noop = () => {};

describe('isDescriptor', () => {
  describe('value type', () => {
    it('should be false when not an object:', () => {
      assert(!isDescriptor('a'));
      assert(!isDescriptor(null));
      assert(!isDescriptor([]));
    });
  });

  describe('data descriptor:', () => {
    it('should be false when the object has invalid properties:', () => {
      assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
      assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
    });

    it('should be false when the object has get or set properties', () => {
      assert(!isDescriptor({ value: 'foo', get: noop }));
      assert(!isDescriptor({ get: noop, value: noop }));
    });

    it('should be false when the object has invalid properties and strict is true', () => {
      assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
      assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
      assert(!isDescriptor({ value: 'foo', get: noop }));
      assert(!isDescriptor({ get: noop, value: noop }));
    });

    it('should be true when the object has valid data-descriptor properties', () => {
      assert(isDescriptor({ value: 'foo' }));
      assert(isDescriptor({ value: noop }));
    });

    it('should be false when valid properties are invalid types', () => {
      assert(!isDescriptor({ value: 'foo', enumerable: 'foo' }));
      assert(!isDescriptor({ value: 'foo', configurable: 'foo' }));
      assert(!isDescriptor({ value: 'foo', writable: 'foo' }));
    });

    it('should be true when a value is a valid data descriptor', () => {
      assert(isDescriptor({ value: 'foo' }));
      assert(!isDescriptor({ writable: true }));
      assert(!isDescriptor({ value: 'foo', get: 'foo' }));
    });

    it('should be false when descriptor has an in-valid propery and "strict" is true', () => {
      assert(isDescriptor({ value: 'foo' }));
      assert(!isDescriptor({ writable: true }, void 0, true));
      assert(!isDescriptor({ value: 'foo', get: 'foo' }, void 0, true));
    });

    it('should be false when the value is not a valid descriptor', () => {
      assert(!isDescriptor('foo'));
      assert(!isDescriptor({}));
      assert(!isDescriptor({ configurable: true }));
      assert(!isDescriptor({ enumerable: true }));
      assert(!isDescriptor({
        get: undefined,
        set: undefined,
        enumerable: true,
        configurable: true
      }));
    });
  });
});
