# react-testutils-query

Utility functions for retrieving elements from within a React virtual-dom tree.

## Installation

    npm install --save-dev react-testutils-query

## Usage

```javascript

import React from 'react';
import $ from 'react-testutils-query';

const header = $(
  <header id="header" className="header">
    <h1 className="header__title">React TestUtils Query</h1>
    <div>
      <p className="header__description">
        Utility functions for retrieving elements from within a Rea/
        ct VDOM tree.
      </p>
      <button className="header__action" onClick={() => {}} disabled>Use now!</button>
    </div>
    <Nav/>
  </header>
);

//find by tag
const button = header.find('button');
button.hasProp('disabled', true);
button.hasClass('header__action');
button.hasText('Use now!');

//find by class
const title = header.find('.header__title');
title.hasClass('header__title');
title.hasText('React TestUtils Query');

//find by component
const nav = header.find(Nav);

```

## Methods

### $(selector : string, element : element) : element | null

Return the first element that matches the selection criteria.

- `selector` - A CSS-like selector or a component class
- `element` - A React virtual-dom element

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell