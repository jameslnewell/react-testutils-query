import React from 'react';
import $ from '../src/index';
import Element from '../src/Element';
import ElementCollection from '../src/ElementCollection';

describe('index', () => {

  it('should throw an error when called with 0 arguments', () => {
    expect(() => $()).to.throw;
  });

  it('should return a collection when called with 1 argument', () => {
    const collection = $(<button>Click me!</button>);
    expect(collection).to.be.instanceOf(ElementCollection);
    expect(collection.length).to.be.equal(1);
  });

  it('should return a collection when called with 2 arguments', () => {
    const collection = $('li',
      <ul>
        <li>#1</li>
        <li>#2</li>
        <li>#3</li>
      </ul>
    );
    expect(collection).to.be.instanceOf(ElementCollection);
    expect(collection.length).to.be.equal(3);
  });

});
