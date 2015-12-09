const React = require('react');
var queryAll = require('./queryAll');
var matchSelector = require('./matchSelector');
var extractText = require('./extractText');

/**
 * Wrapper
 */
class Wrapper {

  /**
   * Create a wrapper
   * @param {ReactElements|Array<ReactElements>} element
   */
  constructor(element) {

    const elements = [].concat(element);

    elements.forEach(element => {
      if (!React.isValidElement(element)) throw new Error('react-testutils-query: Element is not a valid React element.');
    });

    this.elements = elements;
  }

  /**
   * Get the number of elements
   * @returns {number}
   */
  get length() {
    return this.elements.length;
  }

  /**
   * Returns true if every element has the matching property
   * @param   {string}  name
   * @param   {*}       [value]
   * @returns {boolean}
   */
  hasProp(name, value) {

    if (this.length === 0) {
      return false;
    }

    return this.elements.every(element => {

      if (typeof element.props[name] === 'undefined') {
        return false;
      }

      if (typeof value !== 'undefined' && element.props[name] !== value) {
        return false;
      }

      return true;
    });

  }

  /**
   * Returns true if every element has the matching class(es)
   * @param   {string|Array<string>}  name
   * @returns {boolean}
   */
  hasClass(name) {

    if (this.length === 0) {
      return false;
    }

    return this.elements.every(element => {

      if (typeof element.props.className === 'undefined') {
        return false;
      }

      const actual = element.props.className.split(' ');
      const expected = [].concat(name);
      for (var i=0; i<expected.length; ++i) {
        if (expected[i] !== '' && actual.indexOf(expected[i]) === -1) {
          return false;
        }
      }

      return true;
    });

  }

  /**
   * Returns true if every element contains the matching text
   * @returns {boolean}
   */
  hasText(text) {

    if (this.length === 0) {
      return false;
    }

    return this.elements.every(element => {
      return extractText(element) === text;
    });

  }

  /**
   * Find all the ancestor elements that match the selector
   * @param   {string} selector
   * @returns {Wrapper}
   */
  find(selector) {

    const matchedElements = this.elements.reduce(function(matchedElements, element) {
      const foundElements = queryAll(matchSelector(selector), element, {
        checkRoot: false,
        checkChildren: true
      });
      matchedElements = matchedElements.concat(foundElements);
      return matchedElements;
    }, []);

    return new Wrapper(matchedElements);
  }

}

module.exports = Wrapper;

