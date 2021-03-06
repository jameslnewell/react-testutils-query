import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import walk from './walk';
import match from './match';
import queryAll from './queryAll';
import ElementCollection from './ElementCollection';

export default class Element {

  constructor(element) {
    this.node = element;
  }

  /**
   * Get the descendant elements of the element, filtered by selector.
   * @param   {string} [selector]
   * @returns {ElementCollection}
   */
  find(selector = '*') {
    return new ElementCollection(queryAll(this.node, {}, match(selector)));
  }

  /**
   * Get the children elements of the element, filtered by selector.
   * @param   {string} [selector]
   * @returns {ElementCollection}
   */
  children(selector = '*') {
    return new ElementCollection(queryAll(this.node, {maxDepth: 1}, match(selector)));
  }

  type() {
    return this.node.type;
  }

  key() {
    return this.node.key;
  }

  ref() {
    return this.node.ref;
  }

  props() {
    return this.node.props;
  }

  /**
   * Get the value of a property on the element.
   * @param   {string} name
   * @returns {*}
   */
  prop(name) {
    return this.node.props[name];
  }

  /**
   * Get a list of class names applied to the element.
   * @returns {Array<string>}
   */
  classes() {
    let classnames = [];
    if (this.node.props.className) {
      classnames = this.node.props.className.split(/\s+/);
    }
    return classnames;
  }

  /**
   * Get the contents of the element as text.
   * @returns {string}
   */
  text() {
    let content = '';
    walk(this.node, node => {
      if (typeof node === 'string') {
        content += node;
      }
    });
    return content;
  }

  /**
   * Get the contents of the element as HTML.
   * @returns {string}
   */
  html() {
    if (React.Children.count(this.node.props.children)) {
      return React.Children.map(
        this.node.props.children,
        childElement => {
          if (React.isValidElement(childElement)) {
            return renderToStaticMarkup(childElement);
          } else {
            return childElement;
          }
        }
      ).join('');
    } else {
      return '';
    }
  }

  hasKey(key) {
    return this.key() === key;
  }

  /**
   * Check whether the element has the specified property value.
   * @param   {string}  name
   * @param   {*}       value
   * @returns {boolean}
   */
  hasProp(name, value) {
    if (arguments.length < 2) {
      return this.node.props.hasOwnProperty(name);
    } else {
      return this.prop(name) == value; //eslint-disable-line
    }
  }

  /**
   * Whether the element has the specified class names.
   * @param   {string} name
   * @returns {boolean}
   */
  hasClass(name) {
    const names = [].concat(name);
    const classes = this.classes();

    for (let i = 0; i < names.length; ++i) {
      if (classes.indexOf(names[i]) === -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check whether the element contains the specified text substring/pattern.
   * @param   {string|RegExp} substring
   * @returns {boolean}
   */
  hasText(substring) {
    if (substring instanceof RegExp) {
      return substring.test(this.text());
    } else {
      return this.text().indexOf(substring) !== -1;
    }
  }

  toString() {
    return renderToStaticMarkup(this.node);
  }

}
