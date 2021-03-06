import React from 'react';
import parse from './parse';

/**
 * Return whether a node matches the criteria
 * @param   {string|Component} selector
 * @returns {function}
 */
export default function(selector) {

  if (typeof selector === 'undefined') {
    throw new Error('The provided selector is undefined.');
  }

  if (typeof selector === 'string' && selector.length === 0) {
    throw new Error('The provided selector is empty.');
  }

  if (typeof selector === 'function') {
    return function(node) {
      return React.isValidElement(node) && node.type === selector;
    };
  }

  const parsed = parse(selector);

  return node => { //eslint-disable-line complexity

    //nothing matches an empty selector
    if (selector === '') {
      return false;
    }

    //only match elements
    if (!React.isValidElement(node)) {
      return false;
    }

    //match the tag
    if (typeof parsed.tag !== 'undefined' && parsed.tag !== node.type && parsed.tag !== '*') {
      return false;
    }

    //match the id
    if (typeof parsed.id !== 'undefined' && parsed.id !== node.props.id) {
      return false;
    }

    //match the classes
    if (typeof parsed.classes !== 'undefined') {

      if (!node.props.className) {
        return false;
      }

      const expected = parsed.classes;
      const actual = node.props.className.split(' ');
      for (let i = 0; i < expected.length; ++i) {
        if (expected[i] !== '' && actual.indexOf(expected[i]) === -1) {
          return false;
        }
      }

    }

    //match the attributes
    if (typeof parsed.attributes !== 'undefined') {
      const expected = parsed.attributes;
      for (let i = 0; i < expected.length; ++i) {
        const attribute = expected[i];

        if (attribute.operator) {

          switch (attribute.operator) {

            case '=':
              if (node.props[attribute.name] != attribute.value) { //eslint-disable-line eqeqeq
                return false;
              }
              break;

            default:
              throw new Error(`Unsupported attribute operator "${attribute.operator}". Please submit a pull request!`);

          }

        } else if (!node.props[attribute.name]) {
          return false;
        }

      }
    }

    return true;
  };

}
