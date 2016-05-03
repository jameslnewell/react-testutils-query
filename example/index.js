
import React from 'react';
import assert from 'assert';
import $ from '../src';
import classNames from 'classnames';

const options = {
  red: 'Red',
  green: 'Green',
  blue: 'Blue'
};

const option = 'blue';

const form = $(
  <form>

    <div id="fav-color">
      <label>Favourite color:</label>
      <ol className="options options--color">
        {Object.keys(options).map(value => {

          const selected = value === option;
          const classes = classNames('option', {
            'is-selected': selected
          });

          return (
            <li className={classes} key={value}>
              <label><input type="radio" value={value} checked={selected}/> {options[value]}</label>
            </li>
          );

        })}
      </ol>
    </div>

    <button className="button button--primary" disabled>Use now!</button>

  </form>
);

form.find('li')
  .each((element, index) => {

    const text = Object.values(options)[index];
    const value = Object.keys(options)[index];
    const selected = value === option;

    assert(element.hasKey(value));
    assert(element.hasText(text));
    assert.equal(element.hasClass('is-selected'), selected);

    const input = element.find('input');
    assert(input.hasProp('value', value));
    assert(input.hasProp('checked', selected));

  })
;

assert(form.children().length === 2);

assert(form.find('button').hasProp('disabled'));
