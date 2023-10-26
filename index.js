'use strict';

var typeOf = require('kind-of');
var hasOwn = require('hasown');

// data descriptor properties
var data = {
	__proto__: null,
	configurable: 'boolean',
	enumerable: 'boolean',
	writable: 'boolean',
};

module.exports = function isDataDescriptor(obj, prop) {
	if (typeOf(obj) !== 'object') {
		return false;
	}

	if (typeof prop === 'string') {
		var val = Object.getOwnPropertyDescriptor(obj, prop);
		return typeof val !== 'undefined';
	}

	if (!('value' in obj) && !('writable' in obj)) {
		return false;
	}

	for (var key in obj) { // eslint-disable-line no-restricted-syntax
		if (
			key !== 'value'
			&& hasOwn(obj, key)
			&& hasOwn(data, key)
			&& typeOf(obj[key]) !== data[key]
			&& typeof obj[key] !== 'undefined'
		) {
			return false;
		}
	}
	return true;
};
