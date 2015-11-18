var match = require('./match');

/**
 * Find the first element that is a descendant that matches the selector(s)
 * @param   {function}  comparator
 * @param   {object}    tree
 * @returns {object|null}
 */
function query(comparator, tree) {

  //check if the current element matches the selector, otherwise
  // search the child elements for a matching element
  if (comparator(tree)) {
    return tree;
  }

  //check if any of the child elements match the selector, otherwise
  // search the children elements of the child element for a matching element
  if (tree.props && tree.props.children) {
    if (Array.isArray(tree.props.children)) {

      for (var i=0; i<tree.props.children.length; ++i) {
        var childElement = tree.props.children[i];
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

      var childElement = tree.props.children;
      if (comparator(childElement)) {
        return childElement;
      }

    }
  }

  return null;
}

module.exports = query;
module.exports.matcher = match;