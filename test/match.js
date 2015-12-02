import React from 'react';
import {expect} from 'chai';
import match from '../lib/match';

class HelloWorld extends React.Component {
  render() {
    return <h1>Hello World</h1>;
  }
}

class HelloNewcastle extends React.Component {
  render() {
    return <h1>Hello Newcastle</h1>;
  }
}

describe('react-testutils-query', () => {

  describe('match()', () => {

    it('should match an element with the same tag name', () => {
      expect(match('button')(<button/>)).to.be.equal(true);
    });

    it('should not match an element with a different tag name', () => {
      expect(match('footer')(<button/>)).to.be.equal(false);
    });

    it('should match an element with the same id', () => {
      expect(match('#012345')(<button id="012345"/>)).to.be.equal(true);
    });

    it('should not match an element with a different tag name', () => {
      expect(match('#footer')(<button id="012345"/>)).to.be.equal(false);
    });

    it('should match an element with a class name', () => {
      expect(match('.bar')(<button className="bar"/>)).to.be.equal(true);
    });

    it('should match an element with with a single matching class name', () => {
      expect(match('.bar')(<button className="foo bar"/>)).to.be.equal(true);
    });

    it('should match an element with multiple matching class names', () => {
      expect(match('.foo.bar')(<button className="foo bar"/>)).to.be.equal(true);
    });

    it('should not match an element with a different class name', () => {
      expect(match('.footer')(<button className="012345"/>)).to.be.equal(false);
    });

    it('should not match an element with no class name', () => {
      expect(match('.footer')(<button/>)).to.be.equal(false);
    });

    it('should not match a node', () => {
      expect(match('.footer')('hello')).to.be.equal(false);
    });


    it('should match an element with multiple criteria', () => {
      expect(match('button#012345.foo')(<button id="012345" className="foo"/>)).to.be.equal(true);
    });

    it('should match a component', () => {
      expect(match(HelloWorld)(<HelloWorld/>)).to.be.equal(true);
    });

    it('should not match a component', () => {
      expect(match(HelloWorld)(<HelloNewcastle/>)).to.be.equal(false);
    });

  });

});