import React from 'react';

/**
 * Walk an array of child nodes
 * @param   {node|Array<node>}  nodes
 * @param   {object}            opts
 * @param   {function}          each
 * @returns {node}
 */
function walkChildNodes(nodes, opts, each) {
  const {depth} = opts;
  if (Array.isArray(nodes)) {
    for (let i = 0; i < nodes.length; ++i) {
      if (walk(nodes[i], {depth}, each)) { //eslint-disable-line no-use-before-define
        return nodes[i];
      }
    }
  } else if (walk(nodes, {depth}, each)) { //eslint-disable-line no-use-before-define
    return nodes;
  }
}

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

  //I can't remember why I didn't use React.Children.toArray() - it broke stuff though
  depth += 1;
  if (React.isValidElement(node)) {
    walkChildNodes(node.props.children, {depth}, each);
  } else if (Array.isArray(node)) {
    walkChildNodes(node, {depth}, each);
  }

}

/**
 * Walk a tree of nodes
 * @param   {node}      node
 * @param   {object}    [opts]
 * @param   {boolean}   [opts.visitRoot=true]
 * //@param   {boolean}   [opts.maxDepth=null]
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
