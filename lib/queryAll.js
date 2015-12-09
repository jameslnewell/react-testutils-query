const React = require('react');

/**
 * Find the first element that is a descendant that matches the selector(s)
 * @param   {function}  comparator
 * @param   {object}    element
 * @param   {object}    [options]
 * @param   {boolean}   [options.checkRoot]
 * @param   {boolean}   [options.checkChildren]
 * @returns {object|null}
 */
module.exports = function queryAll(comparator, element, options) {
  let matchedElements = [];

  const checkRoot = options && typeof options.checkRoot !== 'undefined' ? options.checkRoot : true;
  const checkChildren = options && typeof options.checkChildren !== 'undefined' ? options.checkChildren : true;

  //ignore invalid elements
  if (!React.isValidElement(element)) {
    return matchedElements;
  }

  //check if the current element matches the selector, otherwise
  // search the child elements for a matching element\
  if (checkRoot && comparator(element)) {
    matchedElements.push(element);
  }

  //check if any of the child elements match the selector, otherwise
  // search the children elements of the child element for a matching element
  if (checkChildren && element.props.children) {
    if (Array.isArray(element.props.children)) {

      for (var i=0; i<element.props.children.length; ++i) {
        var childElement = element.props.children[i];
        var matchedChildElements = queryAll(comparator, childElement, {});
        if (matchedChildElements) {
          matchedElements = matchedElements.concat(matchedChildElements);
        }
      }

    } else {

      var childElement = element.props.children;
      var matchedChildElements = queryAll(comparator, childElement, {});
      if (matchedChildElements) {
        matchedElements.concat(matchedChildElements);
      }

    }
  }

  return matchedElements;
};
