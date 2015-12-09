'use strict';

const Wrapper = require('./lib/Wrapper');
const queryAll = require('./lib/queryAll');
const matchSelector = require('./lib/matchSelector');

/**
 * Get query object
 * @param   {string}        [selector]
 * @param   {ReactElement}  element
 * @returns {object|null}
 */
module.exports = function(selector, element) {

  if (arguments.length === 1) {
    return new Wrapper(selector);
  } else if (arguments.length === 2) {
    return new Wrapper(queryAll(matchSelector(selector), element));
  } else {
    throw new Error('react-testutils-query: Called without an element.');
  }

};