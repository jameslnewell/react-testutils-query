import React from 'react';
import {expect} from 'chai';
import query from '..';

const tree = (
  <header>
    <h1>React TestUtils Query</h1>
    <button>Use now!</button>
  </header>
);

describe('react-testutils-query', () => {

  it('should find an element', () => {
    const element = query('button', tree);
    expect(element).to.deep.equal(<button>Use now!</button>);
  });

});
