
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
  const classesMatch = selector.match(/(\.([a-zA-Z0-9\-_]+))+/);
  if (classesMatch) {
    result.classes = classesMatch[0]
      .split('.')
      .filter(className => className !== '')
    ;
  }

  //attributes
  //const attributeRE = /\[([^\[\]=]+)(?:=([a-z]+))?\]/;
  //let attributesMatch = selector.match(attributeRE);
  //if (attributesMatch) {
  //  result.attributes = [];
  //  while (attributesMatch) {
  //
  //    attributesMatch = selector.match(attributeRE);
  //
  //  }
  //
  //  console.log(attributesMatch);
  //}

  //TODO: first-child etc

  return result;
}
