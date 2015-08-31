/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var diff = require('arr-diff');
var typeOf = require('kind-of');

// data descriptor properties
var data = {
  configurable: 'boolean',
  enumerable: 'boolean',
  writable: 'boolean'
};

function isDataDescriptor(obj) {
  if (typeOf(obj) !== 'object') {
    return false;
  }

  var dataKeys = Object.keys(data);
  var keys = getKeys(obj);

  if (obj.hasOwnProperty('value')) {
    if (diff(keys, dataKeys).length !== 1) {
      return false;
    }
    for (var key in obj) {
      if (key === 'value') continue;
      if (typeOf(obj[key]) !== data[key]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Get object keys. `Object.keys()` only gets
 * enumerable properties.
 */

function getKeys(obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

/**
 * Expose `isDataDescriptor`
 */

module.exports = isDataDescriptor;
