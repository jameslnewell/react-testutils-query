import React from 'react';
import $ from '../src/index';
import Element from '../src/Element';
import ElementCollection from '../src/ElementCollection';

describe('index', () => {

  it('should throw an error when called with 0 arguments', () => {
    expect(() => $()).to.throw;
  });

  it('should return an Element when called with 1 argument', () => {
    const element = $(<button>Click me!</button>);
    expect(element).to.be.instanceOf(Element);
  });

  it('should return a collection when called with 2 arguments', () => {
    const elements = $('li',
      <ul>
        <li>#1</li>
        <li>#2</li>
        <li>#3</li>
      </ul>
    );
    expect(elements).to.be.instanceOf(ElementCollection);
  });

});
