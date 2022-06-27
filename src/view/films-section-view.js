import {createElement} from '../render.js';

const createFilmsSectionTempalte = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  </section>`
);

export default class  FilmsSectionView {
  #element = null;

  get template() {
    return createFilmsSectionTempalte();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

