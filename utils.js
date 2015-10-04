'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Temporarily re-assign require to trick browserify into
 * recognizing lazy requires
 */

var fn = require;
require = utils;
require('arr-diff', 'diff');
require('kind-of', 'typeOf');
require = fn;

/**
 * Expose `utils`
 */

module.exports = utils;
