import React from 'react';
import Wrapper from '../lib/Wrapper';

describe('Wrapper', () => {

  describe('.length', () => {

    it('should be 0 when no matching elements are found', () => {

      const el = new Wrapper([]);
      expect(el.length).to.be.equal(0);

    });

    it('should be 1', () => {

      const el = new Wrapper([<div/>]);
      expect(el.length).to.be.equal(1);

    });

    it('should be 2', () => {

      const el = new Wrapper([<div/>, <div/>]);
      expect(el.length).to.be.equal(2);

    });

  });

  describe('.hasProp()', () => {

    it('should return true when there are no elements', () => {
      const el = new Wrapper([]);
      expect(el.hasProp('disabled')).to.be.true;
    });

    it('should return false when the prop is not present', () => {

      const el = new Wrapper([<div className="hero"/>]);
      expect(el.hasProp('disabled')).to.be.false;

    });

    it('should return true when the prop is present', () => {

      const el = new Wrapper([<div className="hero"/>]);
      expect(el.hasProp('className')).to.be.true;

    });

    it('should return false when the prop is present but does not have the matching value', () => {

      const el = new Wrapper([<div className="foobar"/>]);
      expect(el.hasProp('className', 'hero')).to.be.false;

    });

    it('should return true when the prop is present and has the matching value', () => {

      const el = new Wrapper([<div className="hero"/>]);
      expect(el.hasProp('className', 'hero')).to.be.true;

    });

  });

  describe('.hasClass()', () => {

    describe('=> when there are no elements', () => {

      it('should return true when there are no elements', () => {
        const el = new Wrapper([]);
        expect(el.hasClass('hero')).to.be.true;
      });

    });

    describe('=> when there is a single element', () => {

      it('should return false when there are no classes', () => {
        const el = new Wrapper([<div/>]);
        expect(el.hasClass('hero')).to.be.false;
      });

      it('should return false when there are no matching class', () => {
        const el = new Wrapper([<div className="foobar"/>]);
        expect(el.hasClass('hero')).to.be.false;
      });

      it('should return true when there is a matching class', () => {
        const el = new Wrapper([<div className="hero"/>]);
        expect(el.hasClass('hero')).to.be.true;
      });

      it('should return false when there are not multiple matching classes', () => {
        const el = new Wrapper([<div className="hero"/>]);
        expect(el.hasClass(['hero', 'hero--zeus'])).to.be.false;
      });

      it('should return true when there are multiple matching classes', () => {
        const el = new Wrapper([<div className="hero hero--zeus"/>]);
        expect(el.hasClass(['hero', 'hero--zeus'])).to.be.true;
      });

    });

    describe('=> when there are multiple elements', () => {

      it('should return false when there are no classes', () => {
        const el = new Wrapper([
          <div/>, <div/>
        ]);
        expect(el.hasClass('hero')).to.be.false;
      });

      it('should return false when there are no matching class', () => {
        const el = new Wrapper([
          <div className="foobar"/>, <div className="foobar"/>
        ]);
        expect(el.hasClass('hero')).to.be.false;
      });

      it('should return true when there is a matching class', () => {
        const el = new Wrapper([
          <div className="hero"/>, <div className="hero"/>
        ]);
        expect(el.hasClass('hero')).to.be.true;
      });

      it('should return false when there are not multiple matching classes', () => {
        const el = new Wrapper([
          <div className="hero"/>, <div className="hero"/>
        ]);
        expect(el.hasClass(['hero', 'hero--zeus'])).to.be.false;
      });

      it('should return true when there are multiple matching classes', () => {
        const el = new Wrapper([
          <div className="hero hero--zeus"/>, <div className="hero hero--zeus"/>
        ]);
        expect(el.hasClass(['hero', 'hero--zeus'])).to.be.true;
      });

    });

  });

});
