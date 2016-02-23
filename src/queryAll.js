import walk from './walk';

/**
 * Return an array of nodes that match the criteria
 * @param   {node}      node
 * @param   {function}  match
 * @returns {Array}
 */
export default function(node, match) {
  const matches = [];

  walk(node, {visitRoot: false}, (element, context) => {

    if (match(element, context)) {
      matches.push(element);
    }

  });

  return matches;
}
