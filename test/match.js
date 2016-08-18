/* eslint-disable require-jsdoc, react/no-multi-comp */

import React from 'react';
import match from '../src/match';

function Foo() {
  return <div id="foo"/>;
}

class Bar extends React.Component {
  render() {
    return <div id="bar"/>;
  }
}

describe('match', () => {

  it('should throw an error when the selector is empty', () => {
    expect(() => match('')).to.throw();
  });

  describe('component', () => {

    it('should match when the selector and component are the same', () => {
      expect(match(Foo)(<Foo/>)).to.be.true;
      expect(match(Bar)(<Bar/>)).to.be.true;
    });

    it('should not match when the selector and component are not the same', () => {
      expect(match(Foo)(<Bar/>)).to.be.false;
      expect(match(Bar)(<Foo/>)).to.be.false;
    });

  });

  it('should never match nodes which are not valid react elements', () => {
    expect(match('*')(null)).to.be.false;
    expect(match('*')(true)).to.be.false;
    expect(match('*')(false)).to.be.false;
    expect(match('*')(0)).to.be.false;
    expect(match('*')(1)).to.be.false;
    expect(match('*')('foobar')).to.be.false;
  });

  describe('tag', () => {

    it('should always match *', () => {
      expect(match('*')(<div/>)).to.be.true;
      expect(match('*')(<button/>)).to.be.true;
      expect(match('*')(<li/>)).to.be.true;
    });

    it('should match when the selector and element both have the same tag', () => {
      expect(match('div')(<div/>)).to.be.true;
      expect(match('button')(<button/>)).to.be.true;
      expect(match('li')(<li/>)).to.be.true;
    });

    it('should not match when the selector and element do not have the same tag', () => {
      expect(match('b')(<div/>)).to.be.false;
      expect(match('dl')(<button/>)).to.be.false;
      expect(match('div')(<li/>)).to.be.false;
    });

  });

  describe('id', () => {

    it('should match when the selector and element both have the same ID', () => {
      expect(match('#menu')(<div id="menu"/>)).to.be.true;
    });

    it('should not match when the selector and element do not have the same ID', () => {
      expect(match('#menu')(<div/>)).to.be.false;
      expect(match('#menu')(<div id="search"/>)).to.be.false;
    });

  });

  describe('classes', () => {

    it('should match when the selector and element both have the same classes', () => {
      expect(match('.foo')(<div className="foo"/>)).to.be.true;
      expect(match('.foo.bar')(<div className="foo bar"/>)).to.be.true;
      expect(match('.foo.bar')(<div className="bar foo"/>)).to.be.true;
    });

    it('should not match when the selector and element do not have the same classes', () => {
      expect(match('.foo')(<div/>)).to.be.false;
      expect(match('.foo')(<div className="bar"/>)).to.be.false;
      expect(match('.foo.bar')(<div className="foo"/>)).to.be.false;
    });

  });

  describe('attributes', () => {

    it('should match when the selector and element both have the same attributes', () => {
      expect(match('[disabled]')(<div disabled/>)).to.be.true;
      expect(match('[data-direction]')(<div data-direction="north"/>)).to.be.true;
      expect(match('[data-direction=north]')(<div data-direction="north"/>)).to.be.true;
      expect(match('[data-direction="north"]')(<div data-direction="north"/>)).to.be.true;
      expect(match('[data-direction=\'north\']')(<div data-direction="north"/>)).to.be.true;
      expect(match('[disabled][data-direction=north]')(<div disabled data-direction="north"/>)).to.be.true;
    });

    it('should not match when the selector and element do not have the same attributes', () => {
      expect(match('[disabled]')(<div/>)).to.be.false;
      expect(match('[data-direction]')(<div disabled/>)).to.be.false;
      expect(match('[data-direction=north]')(<div data-direction="south"/>)).to.be.false;
      expect(match('[data-direction="north"]')(<div data-direction="south"/>)).to.be.false;
      expect(match('[data-direction=\'north\']')(<div data-direction="south"/>)).to.be.false;
      expect(match('[disabled][data-direction=\'north\']')(<div disabled/>)).to.be.false;
    });

  });

});
