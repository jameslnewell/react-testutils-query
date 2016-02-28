import React from 'react';


/**
 * Walk a tree of nodes
 * @param   {node}      node
 * @param   {object}    opts
 * @param   {function}  each
 * @returns {node}
 */
function walk(node, opts, each) {
  let depth = typeof opts.depth === 'undefined' ? 0 : Number(opts.depth);
  const visitRoot = typeof opts.visitRoot === 'undefined' ? true : Boolean(opts.visitRoot);

  if (visitRoot) {
    if (each(node, {depth})) {
      return node;
    }
  }

  depth += 1;
  if (React.isValidElement(node)) {

    const childNodes = React.Children.toArray(node.props.children);
    for (let i = 0; i < childNodes.length; ++i) {
      if (walk(childNodes[i], {depth}, each)) {
        return childNodes[i];
      }
    }

  }

}

/**
 * Walk a tree of nodes
 * @param   {node}      node
 * @param   {object}    [opts]
 * @param   {boolean}   [opts.visitRoot=true]
 * @param   {boolean}   [opts.maxDepth=null]
 * @param   {function}  each        Return true to stop walking
 * @returns {node}
 */
export default function(node, opts, each) {

  if (arguments.length < 3) {
    each = opts; //eslint-disable-line
    opts = {}; //eslint-disable-line
  }

  return walk(node, opts, each);
}
