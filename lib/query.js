var match = require('./matchSelector');

/**
 * Find the first element that is a descendant that matches the selector(s)
 * @param   {function}  comparator
 * @param   {object}    element
 * @returns {object|null}
 */
module.exports = function query(comparator, element) {

  //check if the current element matches the selector, otherwise
  // search the child elements for a matching element
  if (comparator(element)) {
    return element;
  }

  //check if any of the child elements match the selector, otherwise
  // search the children elements of the child element for a matching element
  if (element.props && element.props.children) {
    if (Array.isArray(element.props.children)) {

      for (var i=0; i<element.props.children.length; ++i) {
        var childElement = element.props.children[i];
        if (comparator(childElement)) {
          return childElement;
        } else {
          var foundElement = query(comparator, childElement);
          if (foundElement) {
            return foundElement;
          }
        }
      }

    } else {

      var childElement = element.props.children;
      if (comparator(childElement)) {
        return childElement;
      }

    }
  }

  return null;
};