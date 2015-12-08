const React = require('react');
const queryAll = require('./queryAll');

/**
 *
 */
class Wrapper {

  /**
   *
   * @param {string}        [selector]
   * @param {ReactElement}  [context]
   */
  constructor(selector, context) {

    if (arguments.length === 2) {

      this.selector = selector;
      this.context = context;
      this.elements = queryAll(selector, context);

    } else if (arguments.length === 1) {

      this.context = selector;
      this.elements = [selector];

    } else {
      throw new Error('Missing context element.');
    }

  }

  /**
   * Check whether every element in the array has the
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
   * Check whether the element has all the classes
   * @param   {string} name
   * @returns {boolean}
   */
  hasClass(name) {
    return this.elements.every(element => {

    });
  }

}

module.exports = Wrapper;