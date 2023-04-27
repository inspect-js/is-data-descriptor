'use strict';

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

const isDescriptor = (obj, key) => {
	if (!isObject(obj)) {
		return false;
	}
	const desc = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
	if (isObject(desc)) {
		const booleans = [
			'configurable', 'enumerable', 'writable',
		];
		if (!hasOwn(desc, 'value') || hasOwn(desc, 'get') || hasOwn(desc, 'set')) {
			return false;
		}
		for (const descKey of Object.keys(desc)) {
			if (booleans.includes(descKey) && typeof desc[descKey] !== 'boolean') {
				return false;
			}
			if (!booleans.includes(descKey) && descKey !== 'value') {
				return false;
			}
		}
		return true;
	}
	return false;
};

module.exports = isDescriptor;
