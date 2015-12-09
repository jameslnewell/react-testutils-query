'use strict';

const React = require('react');

/**
 * Find the first element that is a descendant that matches the selector(s)
 * @param   {function}  comparator
 * @param   {object}    element
 * @param   {object}    [options]
 * @param   {integer}   [options.depth]
 * @param   {boolean}   [options.checkRoot]
 * @param   {boolean}   [options.checkGrandChildren]
 * @returns {object|null}
 */
module.exports = function queryAll(comparator, element, options) {
  let matchedElements = [];

  let depth = options && options.depth || 0;
  const checkRoot = options && typeof options.checkRoot !== 'undefined' ? options.checkRoot : true;
  const checkGrandChildren = options && typeof options.checkGrandChildren !== 'undefined' ? options.checkGrandChildren : true;

  //ignore invalid elements
  if (!React.isValidElement(element)) {
    return matchedElements;
  }

  //check if the current element matches the selector, otherwise
  // search the child elements for a matching element
  if (!(!checkRoot && depth === 0) && comparator(element)) {
    matchedElements.push(element);
  }

  //ignore grandchildren
  if (!checkGrandChildren && depth >= 1) {
    return matchedElements;
  }

  //check if any of the child elements match the selector, otherwise
  // search the children elements of the child element for a matching element
  React.Children.forEach(element.props.children, childElement => {
    var matchedChildElements = queryAll(comparator, childElement, {
      depth: ++depth,
      checkRoot,
      checkGrandChildren
    });
    matchedElements = matchedElements.concat(matchedChildElements);
  });

  return matchedElements;
};
