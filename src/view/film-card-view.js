import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDateYears, getShortdescription, humanizeFilmDuration} from '../utils/films.js';

const createFilmCardTempalte = (film) => {
  const {comments} = film;
  const {title, totalRating, genre, poster, release, description, runtime} = film.filmInfo;

  const releaseYear = humanizeDateYears(release.date);
  const shortDescription = getShortdescription(description);
  const filmDuration = humanizeFilmDuration(runtime);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${filmDuration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>`);
};

export default class  FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTempalte(this.#film);
  }

  setShowPopupHandler = (callback) => {
    this._callback.showPopup = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#showPopupHandler);
  };

  #showPopupHandler = () => {
    this._callback.showPopup();
  };
}
