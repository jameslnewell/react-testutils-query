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
          <label><input type="radio" value="red"/> Red</label>
        </li>
        <li className="list__item">
          <label><input type="radio" value="green"/> Green</label>
        </li>
        <li className="list__item">
          <label><input type="radio" value="blue" defaultChecked/> Blue</label>
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

### `$(selector, element)`

Get the descendant elements of the element, filtered by selector.

**Parameters:**

- `selector` - A `CSS`-like selector or `React` component
- `element` - A `React` element

**Returns:**

A collection of elements.

### `ElementCollection`

#### `.constructor(elements)`

Create a new collection of elements from an array of elements.

#### `.at(index)`

Get the element at the specified index in the collection.

**Parameters:**

- `index` - The index

**Returns:**

An element.

**Throws:**

If the index is out of bounds.

#### `.first()`

Get the first element in the collection.

**Returns:**

The first element in the collection.

**Throws:**

If the collection is empty.

#### `.last()`

Get the last element in the collection.

**Returns:**

The last element in the collection.

**Throws:**

If the collection is empty.

#### `.find(selector)`

Get descendant elements of every element in the collection, filtered by selector.

Supports:
 - `*`
 - `tag`
 - `#id`
 - `.class`

**Parameters:**

- `selector` - A `CSS`-like selector or `React` component

**Returns:**

A collection of elements.

#### `.text()`

Get the text contents of the first element in the collection.

**Returns:**

A string of text.

#### `.hasText(text)`

Check whether the first element in the collection contains the specified text substring/pattern.

**Parameters:**

- `text` - The substring/pattern

**Returns:**

Whether the first element in the collection contains the specified text substring/pattern.

#### `.prop(name)`

Get the value of a property on the first element in the collection.

**Parameters:**

- `name` - The name of the property

**Returns:**

The value of the property.

#### `.hasProp(name, [value])`

Check whether the first element in the collection has the specified property value.

**Parameters:**

- `name` - The property name
- `value` - The property value

**Returns:**

Whether the first element in the collection has the specified property value.

#### `.classes()`

Get an array of class names applied to the first element in the collection.

**Returns:**

An array of class names.

#### `.hasClass(name)`

Check whether the element first element in the collection has the specified class name(s).

**Parameters:**

- `class` - The class name(s)

**Returns:**

Whether the first element in the collection has the specified class names.

#### `.toArray()`

Get the collection as an array of elements.

**Returns:**

An array of elements.



### `Element`

#### `.constructor(element)`

Create a new element collection from a React element.

#### `.find(selector)`

Get descendant elements of the element, filtered by selector.

**Parameters:**

- `selector` - A `CSS`-like selector or `React` component

**Returns:**

A collection of elements.

#### `.html()`

Get the HTML contents of the element.

#### `.text()`

Get the text contents of the element.

**Returns:**

A string of text.

#### `.hasText(text)`

Check whether the element contains the specified text substring/pattern.

**Parameters:**

- `text` - The substring/pattern

**Returns:**

Whether the element contains the specified text substring/pattern.

#### `.prop(name)`

Get the value of a property on the element.

**Parameters:**

- `name` - The name of the property

**Returns:**

The value of the property.

#### `.hasProp(name, value)`

Check whether the element has the specified property value.

**Parameters:**

- `name` - The property name
- `value` - The property value

**Returns:**

Whether the element has the specified property value.

#### `.classes()`

Get an array of class names applied to the element.

**Returns:**

An array of class names.

#### `.hasClass(name)`

Check whether the element has the specified class name(s).

**Parameters:**

- `class` - The class name(s)

**Returns:**

Whether the element has the specified class names.

#### `.node`

The wrapped React element.


## To do:

- attribute selectors e.g. `[disabled]`
- multi-level selectors e.g. `.class-1 .class-2`
- other jQuery methods

## License

The MIT License (MIT)

Copyright (c) 2016 James Newell