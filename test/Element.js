/* eslint-disable require-jsdoc, react/no-multi-comp */
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

    it('should find elements 1 level deep', () => {
      const col = new Element(
        <p>this is the <em>worst</em> ice cream in the <em>whole</em> wide world</p>
      );
      expect(col.find('em').length).to.be.equal(2);
    });

    it('should find elements 2 levels deep', () => {
      const html = new Element(
        <html>
          <head>
            <title>Foobar</title>
          </head>
        </html>
      );
      expect(html.find('title').length).to.be.equal(1);
    });

    it('should find react components', () => {

      function Foo() {
        return <div className="foo"/>;
      }

      const html = new Element(
        <div>
          <div>
            <Foo/>
          </div>
        </div>
      );

      expect(html.find(Foo).length).to.be.equal(1);

    });

  });

  describe('.children()', () => {

    it('should only return immediate children', () => {
      const parent = new Element(
        <ul>
          <li>I <b>&lt;3</b> pizza</li>
          <li>I <b>&lt;3</b> chocolate</li>
        </ul>
      );
      const children = parent.children();
      expect(children.length).to.be.equal(2);
      children.each(element => expect(element.type()).to.be.equal('li'));
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

    it('should...');

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

    it('should...');

  });

  describe('.html()', () => {
    it('should return a HTML string representing the child nodes', () => {
      const el = new Element(
        <section>
          <button className="button button--primary">Click me!</button>
        </section>
      );
      expect(el.html()).to.be.equal('<button class="button button--primary">Click me!</button>');
    });
  });

  describe('.toString()', () => {
    it('should return a HTML string representing the node', () => {
      const el = new Element(
        <section>
          <button className="button button--primary">Click me!</button>
        </section>
      );
      expect(el.toString()).to.be.equal('<section><button class="button button--primary">Click me!</button></section>');
    });
  });

});
