import React from 'react';
import {expect} from 'chai';
import $ from '..';

const element = (
  <header>
    <h1>React TestUtils Query</h1>
    <button>Use now!</button>
  </header>
);

describe('react-testutils-query', () => {

  it('should find an element', () => {
    const el = $('button', element);
    expect(el.length).to.equal(1);
    expect(el.get(0)).to.deep.equal(<button>Use now!</button>);
  });

});
