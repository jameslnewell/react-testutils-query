var match = require('./lib/match');
var query = require('./lib/query');

/**
 * Find the first element that is a descendant that matches the selector(s)
 * @param   {string}        [selector]
 * @param   {ReactElement}  element
 * @returns {object|null}
 */
module.exports = function(selector, tree) {
  return query(match(selector), tree);
};