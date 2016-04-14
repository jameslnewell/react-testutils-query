import React from 'react';
import walk from '../src/walk';

describe('walk()', () => {

  it('should walk nodes in an array when there are no other children', () => {

    const list = (
      <ul>
        {[
          <li key="1">#1</li>,
          <li key="2">#2</li>,
          <li key="3">#3</li>
        ]}
      </ul>
    );

    let foundListItems = 0;
    walk(list, node => {
      if (typeof node === 'object' && node.type === 'li') {
        ++foundListItems;
      }
    });

    expect(foundListItems).to.be.equal(3);

  });

  it('should walk nodes in an array when there are sibling nodes', () => {

    const html = (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          {[
            <title key="foo"/>
          ]}
        </head>
      </html>
    );

    let foundTitle = true;
    walk(html, node => {
      if (typeof node === 'object' && node.type === 'title') {
        foundTitle = true;
      }
    });

    expect(foundTitle).to.be.true;

  });

});
