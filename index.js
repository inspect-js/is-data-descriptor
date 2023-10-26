'use strict';

var typeOf = require('kind-of');

// data descriptor properties
var data = {
	configurable: 'boolean',
	enumerable: 'boolean',
	writable: 'boolean'
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
			&& Object.hasOwnProperty.call(data, key)
			&& typeOf(obj[key]) !== data[key]
			&& typeof obj[key] !== 'undefined'
		) {
			return false;
		}
	}
	return true;
};
