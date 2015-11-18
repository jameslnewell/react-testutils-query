var parse = require('parse-selector');

/**
 * Return a function which decides whether an element matches the selector
 * @param   {string} selector
 * @returns {function}
 */
module.exports = function(selector) {
  var match;

  if (typeof selector === 'function') {
    return function(element) {
      return element.type && element.type === selector;
    };

  }

  var parsed = parse(selector)[0];

  return function(element) {

    if (!element && !element.props) {
      return false;
    }

    //match the tag
    if (typeof parsed.el !== 'undefined' && parsed.el !== element.type) {
      return false;
    }

    //match the id
    if (typeof parsed.id !== 'undefined' && parsed.id !== '#'+element.props.id) {
      return false;
    }

    //match the expected class(es) amongst the actual classes
    if (typeof parsed.className !== 'undefined') {
      var expected = parsed.className.split('.');
      var actual = element.props.className.split(' ');
      for (var i=0; i<expected.length; ++i) {
        if (expected[i] !== '' && actual.indexOf(expected[i]) === -1) {
          return false;
        }
      }
    }

    return true;
  };

};