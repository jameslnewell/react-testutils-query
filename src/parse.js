
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
  const attributeRe = '([a-zA-Z0-9\-]+)(?:([\\~\\|\\^\\*\\$]?=)([^\\]]+))?';
  const attributesRe = new RegExp(`\\[${attributeRe}\\]`, 'g');
  const attributesMatches = selector.match(attributesRe);
  if (attributesMatches) {
    result.attributes = attributesMatches.map(attributeSelector => {
      const attributeMatches = attributeSelector.match(new RegExp(attributeRe));

      const attribute = {name: attributeMatches[1]};

      if (attributeMatches[3]) {

        //extract the operator
        attribute.operator = attributeMatches[2];

        //extract and unquote the value
        const valueMatches = attributeMatches[3].match(/^"([^"]+)"$|^'([^']+)'$/);
        if (valueMatches) {
          attribute.value = valueMatches[1] || valueMatches[2];
        } else {
          attribute.value = attributeMatches[3];
        }

      }

      return attribute;
    });
  }

  //TODO: :first-child etc

  return result;
}
