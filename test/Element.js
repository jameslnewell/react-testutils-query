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

  describe('.type()', () => {

    it('should be <div/>', () => {
      const element = new Element(<div/>);
      expect(element.type()).to.be.equal('div');
    });

    it('should be <form/>', () => {
      const element = new Element(<form/>);
      expect(element.type()).to.be.equal('form');
    });

  });

  describe('.key()', () => {

    it('should be null', () => {
      const element = new Element(<div/>);
      expect(element.key()).to.be.equal(null);
    });

    it('should be foobar', () => {
      const element = new Element(<div key="foobar"/>);
      expect(element.key()).to.be.equal('foobar');
    });

  });

  describe('.ref()', () => {

    it('should be null', () => {
      const element = new Element(<div/>);
      expect(element.ref()).to.be.equal(null);
    });

    it('should be foobar', () => {
      const element = new Element(<div ref="foobar"/>);
      expect(element.ref()).to.be.equal('foobar');
    });

  });

  describe('.text()', () => {

    it('should return a string', () => {

      const single = new Element(<p>Hello World!</p>);
      expect(single.text()).to.be.equal('Hello World!');

      const mixed = new Element(<p>He<b>ll</b>o World!</p>);
      expect(mixed.text()).to.be.equal('Hello World!');

      const nested = new Element(<ul><li>He</li><li>l<b>l</b></li><li>o World!</li></ul>);
      expect(nested.text()).to.be.equal('Hello World!');

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

  describe('.hasText()', () => {

  });

});
