'use strict';

var test = require('tape');

var isDescriptor = require('../');
var noop = function () {};

test('isDescriptor', function (t) {
	t.test('value type: is false when not an object', function (st) {
		st.notOk(isDescriptor('a'));
		st.notOk(isDescriptor(null));
		st.notOk(isDescriptor([]));

		st.end();
	});

	t.test('data descriptor:', function (st) {
		st.notOk(isDescriptor({ value: 'foo', bar: 'baz' }), 'is false when the object has invalid properties');

		st.notOk(isDescriptor({ value: 'foo', get: noop }), 'is false when the object has get or set properties');
		st.notOk(isDescriptor({ get: noop, value: noop }), 'is false when the object has get or set properties');

		st.test('is false when the object has invalid properties and strict is true', function (s2t) {
			s2t.notOk(isDescriptor({ value: 'foo', bar: 'baz' }));
			s2t.notOk(isDescriptor({ value: 'foo', bar: 'baz' }));
			s2t.notOk(isDescriptor({ value: 'foo', get: noop }));
			s2t.notOk(isDescriptor({ get: noop, value: noop }));

			s2t.end();
		});

		st.test('is true when the object has valid data-descriptor properties', function (s2t) {
			s2t.ok(isDescriptor({ value: 'foo' }));
			s2t.ok(isDescriptor({ value: noop }));

			s2t.end();
		});

		st.test('is false when valid properties are invalid types', function (s2t) {
			s2t.notOk(isDescriptor({ value: 'foo', enumerable: 'foo' }));
			s2t.notOk(isDescriptor({ value: 'foo', configurable: 'foo' }));
			s2t.notOk(isDescriptor({ value: 'foo', writable: 'foo' }));

			s2t.end();
		});

		st.test('should be true when a value is a valid data descriptor', function (s2t) {
			s2t.ok(isDescriptor({ value: 'foo' }));
			s2t.notOk(isDescriptor({ writable: true }));
			s2t.notOk(isDescriptor({ value: 'foo', get: 'foo' }));

			s2t.end();
		});

		st.test('is false when descriptor has an in-valid propery and "strict" is true', function (s2t) {
			s2t.ok(isDescriptor({ value: 'foo' }));
			s2t.notOk(isDescriptor({ writable: true }, void undefined, true));
			s2t.notOk(isDescriptor({ value: 'foo', get: 'foo' }, void undefined, true));

			s2t.end();
		});

		st.test('should be false when the value is not a valid descriptor', function (s2t) {
			s2t.notOk(isDescriptor('foo'));
			s2t.notOk(isDescriptor({}));
			s2t.notOk(isDescriptor({ configurable: true }));
			s2t.notOk(isDescriptor({ enumerable: true }));
			s2t.notOk(isDescriptor({
				get: undefined,
				set: undefined,
				enumerable: true,
				configurable: true
			}));

			s2t.end();
		});
	});

	t.test('with a key', function (st) {
		st.equal(isDescriptor({ foo: 3 }, 'foo'), true, 'a data property is a data descriptor');
		st.equal(isDescriptor({ '': 3 }, ''), true, 'an empty string data property is a data descriptor');
		st.equal(isDescriptor({ 0: 3 }, 0), true, 'a zero data property is a data descriptor');

		st.end();
	});
});
