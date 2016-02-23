import React from 'react';
import Element from '../src/Element';

describe('Element', () => {

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
