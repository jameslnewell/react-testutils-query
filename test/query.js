import React from 'react';
import {expect} from 'chai';
import query from '../lib/query';

const tree = (
  <header id="header" className="header">
    <h1 className="header__title">React TestUtils Query</h1>
    <div>
      <p className="header__description">
        Utility functions for retrieving elements from within a React VDOM tree.
      </p>
      <button onClick={() => {/* do nothing */}}>Use now!</button>
    </div>
  </header>
);

describe('react-testutils-query', () => {

  describe('query()', () => {

    it('should not find an element', () => {
      const element = query(element => false, tree);
      expect(element).to.be.null;
    });

    it('should find the root element', () => {
      const element = query(element => true, tree);
      expect(element).to.equal(tree);
    });

    it('should find a descendant element', () => {
      const element = query(element => element.type === 'button', tree);
      expect(element).to.exist;
      expect(element).to.have.property('type', 'button');
      expect(element).to.equal(tree.props.children[1].props.children[1]);
    });

  });

});