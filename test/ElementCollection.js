import React from 'react';
import ElementCollection from '../src/ElementCollection';

describe('ElementCollection', () => {

  describe('.length', () => {

    it('should have a length of 0 when the set is empty', () => {
      const col = new ElementCollection([]);
      expect(col.length).to.be.equal(0);
    });

    it('should have a length of 1 when the set has one element', () => {
      const col = new ElementCollection([<div/>]);
      expect(col.length).to.be.equal(1);
    });

    it('should have a length of 2 when the set has two elements', () => {
      const col = new ElementCollection([<h1/>, <p/>]);
      expect(col.length).to.be.equal(2);
    });

  });

  describe('.at()', () => {

    it('should throw when the collection is empty', () => {
      const col = new ElementCollection([]);
      expect(() => col.at(0)).to.throw;
    });

    it('should return the first element when the collection has one element', () => {
      const col = new ElementCollection([<div/>]);
      expect(col.at(0).node).to.be.deep.equal(<div/>);
    });

    it('should return the first element when the collection has two elements', () => {
      const col = new ElementCollection([<h1/>, <p/>]);
      expect(col.at(0).node).to.be.deep.equal(<h1/>);
    });

    it('should return the second element when the collection has two elements', () => {
      const col = new ElementCollection([<h1/>, <p/>]);
      expect(col.at(1).node).to.be.deep.equal(<p/>);
    });

  });

  describe('.first()', () => {

    it('should throw when the collection is empty', () => {
      const col = new ElementCollection([]);
      expect(() => col.first()).to.throw;
    });

    it('should return the first element when the collection is not empty', () => {
      const col = new ElementCollection([<h1/>, <p/>]);
      expect(col.first().node).to.be.deep.equal(<h1/>);
    });

  });

  describe('.last()', () => {

    it('should throw when the collection is empty', () => {
      const col = new ElementCollection([]);
      expect(() => col.last()).to.throw;
    });

    it('should return the last element when the collection is not empty', () => {
      const col = new ElementCollection([<h1/>, <p/>]);
      expect(col.last().node).to.be.deep.equal(<p/>);
    });

  });

  describe('.find()', () => {

    it('should find every descendant of every element in the collection', () => {
      const col = new ElementCollection([
        <div><p>this is the <em>best</em> ice cream in the <em>whole</em> wide world</p></div>,
        <div><p>this is the <em>worst</em> ice cream in the <em>whole</em> wide world</p></div>
      ]);
      expect(col.find('*').length).to.be.equal(6);
    });

    it('should find every descendant of every element in the collection matching the selector', () => {
      const col = new ElementCollection([
        <p>this is the <em>best</em> ice cream in the <em>whole</em> wide world</p>,
        <p>this is the <em>worst</em> ice cream in the <em>whole</em> wide world</p>
      ]);
      expect(col.find('em').length).to.be.equal(4);
    });

  });

  describe('.each()', () => {

    it('should call the callback for each element', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      let count = 0;
      col.each(() => ++count);

      expect(count).to.be.equal(4);

    });

    it('should pass the index', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      let i = 0;
      col.each((element, index) => expect(index).to.be.equal(i++));

    });

    it('should pass the element', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      col.each((element, index) => expect(element).to.be.equal(col.at(index)));

    });

    it('should return the collection', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      expect(col.each(() => {/*do nothing*/})).to.be.equal(col);

    });

  });

  describe('.map()', () => {

    it('should call the callback for each element', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      let count = 0;
      col.map(() => ++count);

      expect(count).to.be.equal(4);

    });

    it('should pass the index', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      let i = 0;
      col.map((element, index) => expect(index).to.be.equal(i++));

    });

    it('should pass the element', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      col.map((element, index) => expect(element).to.be.equal(col.at(index)));

    });

    it('should return an array of new values', () => {

      const col = new ElementCollection([
        <div id="1"></div>,
        <div id="2"></div>,
        <div id="3"></div>,
        <div id="4"></div>
      ]);

      expect(col.map(element => element.prop('id'))).to.be.deep.equal([
        '1', '2', '3', '4'
      ]);

    });

  });

  describe('.toArray()', () => {

    it.skip('should return an array with the same elements and length', () => {

    });

  });

});
