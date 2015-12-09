import React from 'react';
import {expect} from 'chai';
import $ from '..';

const header = (
  <header>
    <h1>React TestUtils Query</h1>
    <button>Use now!</button>
  </header>
);

describe('react-testutils-query', () => {

  it('should find an element', () => {
    const buttons = $(header).find('button');
    expect(buttons.length).to.equal(1);
    expect(buttons.hasText('Use now!')).to.be.true;
    //expect(buttons.firstElement).to.deep.equal(<buttons>Use now!</buttons>);
  });

});
