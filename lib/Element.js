import React from 'react';

/**
 * Element
 */
export default class Element {

  /**
   * Create an element
   * @param {Array<ReactElements>} elements
   */
  constructor(elements) {
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
   * Returns true if every element has a matching property
   * @param   {string}  name
   * @param   {*}       [value]
   * @returns {boolean}
   */
  hasProp(name, value) {
    return this.elements.every(element => {

      if (!React.isValidElement(element)) {
        return false;
      }

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
   * Returns true if every element has a matching class
   * @param   {string|Array<string>}  name
   * @returns {boolean}
   */
  hasClass(name) {
    return this.elements.every(element => {

      if (!React.isValidElement(element)) {
        return false;
      }

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

  find() {

  }

}

