import QueryElement from './Element';

/**
 * Utility to flatten a nested array
 * @param   {Array} array
 * @returns {Array}
 */
function flatten(array) {
  return array.reduce((accum, next) => accum.concat(next), []);
}

/*

 .is()
 .not() - Remove elements from the set of matched elements.
 .has() - Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
 .children()
 //.contents() //https://api.jquery.com/contents/
 .find() - Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
 .closest() - For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.

 */

/**
 * A collection of elements
 */
export default class ElementCollection {

  /**
   * Create a new element collection from a React element.
   * @param   {Array<HTMLElement>} elements
   * @returns {void}
   */
  constructor(elements) {

    //if not an array, add the element to an array
    const concatElements = [].concat(elements);

    //make the collection array-like
    for (let i = 0; i < concatElements.length; ++i) {
      if (concatElements[i] instanceof QueryElement) {
        this[i] = concatElements[i];
      } else {
        this[i] = new QueryElement(concatElements[i]);
      }
    }
    this.length = concatElements.length;
    this.splice = Array.prototype.splice;
    this.each = (...args) => {
      Array.prototype.forEach.call(this, ...args);
      return this;
    };
    this.map = (...args) => Array.prototype.map.call(this, ...args);

  }

  /**
   * Return the element at the specified index in the collection
   * @param   {number} index
   * @returns {Element}
   */
  at(index) {

    if (index < 0 || index >= this.length) {
      throw new RangeError(`No element at index ${index}`);
    }

    return this[Number(index)] || null;
  }

  /**
   * Return the first element in the collection
   * @returns {Element}
   */
  first() {
    return this.at(0);
  }

  /**
   * Return the last element in the collection
   * @returns {Element}
   */
  last() {
    return this.at(this.length - 1);
  }

  /**
   * For every element in the collection, find every descendant element that matches the selector
   * @param   {string} selector
   * @returns {ElementCollection}
   */
  find(selector) {
    return new ElementCollection(flatten(
      this.map(element => element.find(selector).toArray())
    ));
  }

  /**
   * Return all of the elements as an array
   * @returns {Array<Element>}
   */
  toArray() {
    const array = [];
    for (let i = 0; i < this.length; ++i) {
      array.push(this[i]);
    }
    return array;
  }

  //============= PROXY FUNCTIONS =============

  /**
   * Get the text contents of the first element in the collection.
   * @returns {string}
   */
  text(...args) {
    return this.first().text(...args);
  }

  /**
   * Check whether the first element in the collection contains the specified text
   * @param   {string} text
   * @returns {boolean}
   */
  hasText(...args) {
    return this.first().hasText(...args);
  }

  /**
   * @param   {string} name
   * @returns {*}
   */
  prop(...args) {
    return this.first().prop(...args);
  }

  /**
   * Check whether the first element in the collection has the specified property
   * @param   {string} name
   * @param   {string} value
   * @returns {boolean}
   */
  hasProp(...args) {
    return this.first().hasProp(...args);
  }

  /**
   * @returns {Array.<string>}
   */
  classes(...args) {
    return this.first().classes(...args);
  }

  /**
   * Check whether the first element in the collection contains the specified class(es)
   * @param   {string|Array<string>} name
   * @returns {boolean}
   */
  hasClass(...args) {
    return this.first().hasClass(...args);
  }

}
