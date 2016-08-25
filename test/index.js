import React from 'react';
import $ from '../src/index';
import Element from '../src/Element';
import ElementCollection from '../src/ElementCollection';

describe('index', () => {

  it('should throw an error when called with 0 arguments', () => {
    expect(() => $()).to.throw;
  });

  it('should return an element when called with a single element object', () => {
    const collection = $(<button>Click me!</button>);
    expect(collection).to.be.instanceOf(Element);
  });

  it('should return a collect when called with a multiple element objects', () => {
    const collection = $([
      <button>Click #1</button>,
      <button>Click #2</button>
    ]);
    expect(collection).to.be.instanceOf(ElementCollection);
    expect(collection.length).to.be.equal(2);
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
