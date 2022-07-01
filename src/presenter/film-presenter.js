import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class FilmPresenter {
  #filmComponent = null;
  #popupComponent = null;
  #filmListContainer = null;

  #film = null;
  #comments = null;

  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init = (film,comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmCardView(this.#film);
    this.#popupComponent = new PopupView(this.#film, this.#comments);

    this.#filmComponent.setShowPopupHandler(this.#handlerShowPopup);
    this.#popupComponent.setClosePopupHandler(this.#handlerClosePopup);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  #replaceFilmToPopup = () => {
    document.body.appendChild(this.#popupComponent.element);
    document.body.classList.add('hide-overflow');
  };

  #replacePopupToFilm = () => {
    document.body.removeChild(document.querySelector('.film-details'));
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePopupToFilm();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handlerShowPopup = () => {
    this.#replaceFilmToPopup();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handlerClosePopup = () => {
    this.#replacePopupToFilm();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
