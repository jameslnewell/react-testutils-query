'use strict';

const React = require('react');
const queryAll = require('./queryAll');
const matchSelector = require('./matchSelector');
const extractText = require('./extractText');

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
   * Get the first element
   * @returns {Wrapper}
   */
  get first() {
    if (this.length) {
      return new Wrapper(this.elements[0]);
    } else {
      return new Wrapper([]);
    }
  }

  /**
   * Get the last element
   * @returns {Wrapper}
   */
  get last() {
    if (this.length) {
      return new Wrapper(this.elements[this.elements.length-1]);
    } else {
      return new Wrapper([]);
    }
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
      return extractText(element).trim() === text.trim();
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
        checkGrandChildren: true
      });
      matchedElements = matchedElements.concat(foundElements);
      return matchedElements;
    }, []);

    return new Wrapper(matchedElements);
  }

  /**
   * Find all the children elements that match the selector
   * @param   {string} [selector]
   * @returns {Wrapper}
   */
  children(selector) {

    const matchedElements = this.elements.reduce(function(matchedElements, element) {
      const foundElements = queryAll(matchSelector(selector || '*'), element, {
        checkRoot: false,
        checkGrandChildren: false
      });
      matchedElements = matchedElements.concat(foundElements);
      return matchedElements;
    }, []);

    return new Wrapper(matchedElements);
  }

}

module.exports = Wrapper;

