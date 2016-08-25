import Element from './Element';
import ElementCollection from './ElementCollection';

/**
 * Return a collection of elements that match the selector
 * @param   {string}  [selector]
 * @param   {object}  element
 * @returns {Element|ElementCollection}
 */
export default function(selector, element) {

  if (arguments.length === 0) {
    throw new Error('react-testutils-query: Called without an element.');
  }

  if (arguments.length === 1) {
    if (Array.isArray(selector)) {
      return new ElementCollection(selector);
    } else {
      return new Element(selector);
    }
  } else {
    const wrapper = new ElementCollection([].concat(element));
    return wrapper.find(selector);
  }

}
