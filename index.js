'use strict';

var hasOwn = function (obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};
var isObject = function (val) {
	return val !== null && typeof val === 'object' && !Array.isArray(val);
};

module.exports = function isDataDescriptor(obj, key) {
	if (!isObject(obj)) {
		return false;
	}
	var desc = arguments.length > 1 ? Object.getOwnPropertyDescriptor(obj, key) : obj;
	if (isObject(desc)) {
		if (
			!hasOwn(desc, 'value')
			|| hasOwn(desc, 'get')
			|| hasOwn(desc, 'set')
			|| (hasOwn(desc, 'configurable') && typeof desc.configurable !== 'boolean')
			|| (hasOwn(desc, 'enumerable') && typeof desc.enumerable !== 'boolean')
			|| (hasOwn(desc, 'writable') && typeof desc.writable !== 'boolean')
		) {
			return false;
		}
		for (var descKey in desc) { // eslint-disable-line no-restricted-syntax
			if (
				hasOwn(desc, descKey)
				&& descKey !== 'configurable'
				&& descKey !== 'enumerable'
				&& descKey !== 'writable'
				&& descKey !== 'value'
			) {
				return false;
			}
		}

		return true;
	}
	return false;
};
