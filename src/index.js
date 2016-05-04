import ElementCollection from './ElementCollection';

/**
 * Return a collection of elements that match the selector
 * @param   {string}  [selector]
 * @param   {object}  element
 * @returns {ElementCollection}
 */
export default function(selector, element) {

  if (arguments.length === 1) {
    element = selector; //eslint-disable-line no-param-reassign
    selector = null; //eslint-disable-line no-param-reassign
  } else if (arguments.length === 0) {
    throw new Error('react-testutils-query: Called without an element.');
  }

  const wrapper = new ElementCollection([].concat(element));

  if (selector) {
    return wrapper.find(selector);
  }

  return wrapper;
}
