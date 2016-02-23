import match from './src/match';
import queryAll from './src/queryAll';
import Element from './src/Element';

/**
 * Return a collection of elements that match the selector
 * @param   {string}  [selector]
 * @param   {object}  element
 * @returns {ElementCollection}
 */
export default function(selector, element) {

  if (arguments.length === 1) {
    element = selector;
    selector = null;
  } else if (arguments.length === 0) {
    throw new Error('react-testutils-query: Called without an element.');
  }

  const wrapper = new Element(element);

  if (selector) {
    return wrapper.find(selector);
  }

  return wrapper;
};