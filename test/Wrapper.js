import React from 'react';
import {expect} from 'chai';
import $ from '../lib/Wrapper';

describe('Wrapper', () => {

  describe('.hasProp()', () => {

    it('should return false when the prop is not present', () => {

      const el = new $(
        <header className="hero">
          <h1>React TestUtils Query</h1>
          <button>Use now!</button>
        </header>
      );

      expect(el.hasProp('disabled')).to.be.false;

    });

    it('should return true when the prop is present', () => {

      const el = new $(
        <header className="hero">
          <h1>React TestUtils Query</h1>
          <button>Use now!</button>
        </header>
      );

      expect(el.hasProp('className')).to.be.true;

    });

    it('should return true when the prop is present with the same value', () => {

      const el = new $(
        <header className="hero">
          <h1>React TestUtils Query</h1>
          <button>Use now!</button>
        </header>
      );

      expect(el.hasProp('className', 'hero')).to.be.true;

    });

  });

});
