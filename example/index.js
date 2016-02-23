
import React from 'react';
import assert from 'assert';
import $ from '..';

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

    <button className="button button--primary" onClick={() => {}} disabled>Use now!</button>

  </form>
);

form.find('li')
  .each(element => {
    assert(element.hasText(/Red|Green|Blue/));
    assert(element.hasClass('list__item'));
  })
;

assert(form.find('button').hasProp('disabled'));
