const React = require('react');

/**
 * Find the first element that is a descendant that matches the selector(s)
 * @param   {object}    element
 * @returns {object|null}
 */
module.exports = function extractText(element) {
  let text = '';

  //ignore invalid elements
  if (!React.isValidElement(element)) {
    return element;
  }

  //check if any of the child elements match the selector, otherwise
  // search the children elements of the child element for a matching element
  if (element.props.children) {
    if (Array.isArray(element.props.children)) {
      for (var i=0; i<element.props.children.length; ++i) {

        var childElement = element.props.children[i];

        if (React.isValidElement(childElement)) {
          text += extractText(childElement)
        } else {
          text += childElement;
        }

      }
    } else {

      var childElement = element.props.children;

      if (React.isValidElement(childElement)) {
        text += extractText(childElement)
      } else {
        text += childElement;
      }

    }
  }

  return text;
};
