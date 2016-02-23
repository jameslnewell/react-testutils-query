
/**
 * Parse a CSS-like selector
 * @param   {string} selector
 * @returns {{tag: string, id: string, classes: []}}
 */
export default function(selector) {
  const result = {};

  //tag
  const tagMatch = selector.match(/^([a-zA-Z0-9\-]+)/);
  if (tagMatch) {
    result.tag = tagMatch[1];
  }

  //ID
  const idMatch = selector.match(/#([a-zA-Z0-9\-]+)/);
  if (idMatch) {
    result.id = idMatch[1];
  }

  //classes
  const classesMatch = selector.match(/(\.([a-zA-Z0-9\-]+))+/);
  if (classesMatch) {
    result.classes = classesMatch[0]
      .split('.')
      .filter(className => className !== '')
    ;
  }

  //TODO: attributes

  //TODO: first-child etc

  return result;
}
