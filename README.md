# react-testutils-query

Utility functions for accessing elements within a React Virtual-DOM tree.

## Installation

    npm install --save-dev react-testutils-query

## Usage

```javascript

import React from 'react';
import assert from 'assert';
import $ from 'react-testutils-query';

const form = $(
  <form>

    <div id="fav-color">
      <label>Favourite color:</label>
      <ol className="list list--color">
        <li className="list__item">
          <label><input type="radio" name="color" value="red"/> Red</label>
        </li>
        <li className="list__item">
          <label><input type="radio" name="color" value="green"/> Green</label>
        </li>
        <li className="list__item">
          <label><input type="radio" name="color" value="blue" defaultChecked/> Blue</label>
        </li>
      </ol>
    </div>

    <button className="button button--primary" disabled>Use now!</button>

  </form>
);

form.find('li')
  .each(element => {
    assert(element.hasClass('list__item'));
    assert(element.hasText(/Red|Green|Blue/));
  })
;

assert(form.find('button').hasProp('disabled'));

```

## API

### `$([selector], element) : ElementCollection`

Get the descendant elements of the element, filtered by selector.

**Parameters:**

- `selector : string|ReactComponent` - A `CSS`-like selector or `React` component
- `element : ReactElement|array` - The `React` element(s)

**Returns:**

A collection of elements.

### ElementCollection

#### `.first() : Element`

Get the first element in the collection.

**Returns:**

The first element in the collection.

**Throws:**

If the collection is empty.

#### `.last() : Element`

Get the last element in the collection.

**Returns:**

The last element in the collection.

**Throws:**

If the collection is empty.

#### `.at(index) : Element`

Get the element at the specified index in the collection.

**Parameters:**

- `index : number` - The index

**Returns:**

An element.

**Throws:**

If the index is out of bounds.

#### `.find(selector = '*') : ElementCollection`

Get the descendant elements of every element in the collection, filtered by selector.


**Parameters:**

- `selector : string|ReactComponent` - A `CSS`-like selector or `React` component

    Supports:
     - `*`
     - `tag`
     - `#id`
     - `.class`
     - `[attr][attr=value]`

**Returns:**

A collection of elements.

#### `.children(selector = '*') : ElementCollection`

Get the children elements of every element in the collection, filtered by selector.

**Parameters:**

- `selector : string|ReactComponent` - A `CSS`-like selector or `React` component

    Supports:
     - `*`
     - `tag`
     - `#id`
     - `.class`
     - `[attr][attr=value]`


**Returns:**

A collection of elements.

### `.classes() : Array<string>`

Get a list of class names applied to every element in the collection.

**Returns:**

An array of unique class names.

#### `.text() : string`

Get the text from all the elements in the collection (like `.textContent`).

**Returns:**

A string of text.

#### `.toString() : string`

Get all the elements in the collection as a HTML string (like `.outerHTML`).

**Returns:**

A HTML string.

#### `.toArray() : Array<Element>`

Get all the elements in the collection as an array of elements.

**Returns:**

An array of elements.

### Element

#### `.find(selector = '*') : ElementCollection`

Get the descendant elements of the element, filtered by selector.


**Parameters:**

- `selector : string|ReactComponent` - A `CSS`-like selector or `React` component

    Supports:
     - `*`
     - `tag`
     - `#id`
     - `.class`
     - `[attr][attr=value]`

**Returns:**

A collection of elements.

#### `.children(selector = '*') : ElementCollection`

Get the children elements of the element, filtered by selector.

**Parameters:**

- `selector : string|ReactComponent` - A `CSS`-like selector or `React` component

    Supports:
     - `*`
     - `tag`
     - `#id`
     - `.class`
     - `[attr][attr=value]`


**Returns:**

A collection of elements.

### `.prop(name : string) : *`

Get the value of a property on the element.

**Returns:**

The prop value if one exists, or `undefined`.

### `.classes() : Array<string>`

Get a list of class names applied to the element.

**Returns:**

An array of class names.

#### `.text() : string`

Get the text the element (like `.textContent`).

**Returns:**

A string of text.

#### `.html() : string`

Get the children elements as a HTML string (like `.innerHTML`).

**Returns:**

A string of text.

#### `.toString() : string`

Get the element as a HTML string (like `.outerHTML`).

**Returns:**

A HTML string.

#### `.type() : string`
#### `.key() : string`
#### `.hasKey(key) : boolean`
#### `.ref() : string`
#### `.props() : object`
#### `.hasProp(name: string, [value: *]) : string`
#### `.hasClass(name: string) : string`
#### `.hasText(value: string|RegExp) : string`

## Change log

### 0.9.1

- added missing `ElementCollection.classes()`

### 0.9.0

- added a notification when the provided selector is undefined (happens frequently when the passed thing is not a React component)
- removed methods from `ElementCollection` which just proxy to individual `Element`s (`prop()`, `hasProp()`, `classes()`, `hasClass()`) because they're confusing and result in incorrect results when you've assumed they work on all the elements!
- changed `.text()` to return the tex of all the `Element`s in the collection

### 0.8.0

- added support for children selectors e.g. `[disabled]`
- changed `$()` to also take an array of elements
- improved documentation

### 0.7.0

- added `.children()` method
- modified `.toString()` to return a string representation of the element itself

## To do

- multi-level selectors e.g. `.class-1 .class-2`
- other jQuery methods

## License

The MIT License (MIT)

Copyright (c) 2016 James Newell