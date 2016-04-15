import React from 'react';
import parse from './parse';

/**
 * Return whether a node matches the criteria
 * @param   {string|Component} selector
 * @returns {function}
 */
export default function(selector) {

  if (typeof selector === 'string' && selector.length === 0) {
    throw new Error('The provided selector is empty.');
  }

  if (typeof selector === 'function') {
    return function(node) {
      return React.isValidElement(node) && node.type === selector;
    };
  }

  const parsed = parse(selector);

  return node => {

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

    //match the expected class(es) amongst the actual classes
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

    return true;
  };

}
