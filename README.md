# react-testutils-query

Utility functions for retrieving elements from within a React virtual-dom tree.

## Installation

    npm install --save react-testutils-query

## Usage

```javascript

import React from 'react';
import $ from 'react-testutils-query';

const tree = (
  <header id="header" className="header">
    <h1 className="header__title">React TestUtils Query</h1>
    <div>
      <p className="header__description">
        Utility functions for retrieving elements from within a Rea/
        ct VDOM tree.
      </p>
      <button className="header__action" onClick={() => {}}>Use now!</button>
    </div>
    <Nav/>
  </header>
);

//find by tag
const button = $('button', tree);

//find by class
const header = $('.header', tree);

//find by component
const nav = $(Nav, tree);

```

## Methods

### $(selector : string, element : element) : element | null

Return the first element that matches the selection criteria.

- `selector` - A CSS-like selector or a component class
- `element` - A React virtual-dom element

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell