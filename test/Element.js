import React from 'react';
import Element from '../src/Element';

describe('Element', () => {

  describe('.find()', () => {

    it('should find every descendant of the element', () => {
      const col = new Element(
        <div><p>this is the <em>worst</em> ice cream in the <em>whole</em> wide world</p></div>
      );
      expect(col.find('*').length).to.be.equal(3);
    });

    it('should find every descendant of the element', () => {
      const col = new Element(
        <p>this is the <em>worst</em> ice cream in the <em>whole</em> wide world</p>
      );
      expect(col.find('em').length).to.be.equal(2);
    });

  });

  describe('.hasProp()', () => {

  });

  describe('.hasClass()', () => {

    it('should return false when', () => {
      const el = new Element(<button className="button button--primary"/>);
      expect(el.hasClass('icon')).to.be.false;
    });

    it('should return false when', () => {
      const el = new Element(<button className="button button--primary"/>);
      expect(el.hasClass(['icon', 'icon--warning'])).to.be.false;
    });

    it('should return true when', () => {
      const el = new Element(<button className="button button--primary"/>);
      expect(el.hasClass('button')).to.be.true;
    });

    it('should return true when', () => {
      const el = new Element(<button className="button button--primary"/>);
      expect(el.hasClass(['button', 'button--primary'])).to.be.true;
    });

  });

});
