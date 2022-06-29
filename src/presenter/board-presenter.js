import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import NoFilmView from '../view/no-film-view.js';

const FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #filmSectionComponent = new FilmsSectionView();
  #filmListComponent = new FilmCardListView();
  #siteFilmsList = this.#filmSectionComponent.element.querySelector('.films-list');
  #showMoreButtonComponent = new ShowMoreButtonView();

  #boardFilms = [];
  #boardComments = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(boardContainer, filmsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardComments = [...this.#filmsModel.comments];
    this.#renderBoard();
  };

  #handleShowMoreButton = () => {
    this.#boardFilms
      .slice(this.#renderedFilmCount,  this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#boardComments));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#boardFilms.length <= this.#renderedFilmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilm = (film, comments) => {
    const filmComponent = new FilmCardView(film);
    const popupComponent = new PopupView(film, comments);

    const replaceFilmToPopup = () => {
      document.body.appendChild(popupComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const replacePopupToFilm = () => {
      document.body.removeChild(document.querySelector('.film-details'));
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replacePopupToFilm();
        document.removeEventListener('keydown',onEscKeyDown);
      }
    };

    filmComponent.setShowPopupHandler(() => {
      replaceFilmToPopup();
      document.addEventListener('keydown',onEscKeyDown);
    });

    popupComponent.setClosePopupHandler(() => {
      replacePopupToFilm();
      document.removeEventListener('keydown',onEscKeyDown);
    });

    render(filmComponent, this.#filmListComponent.element);
  };

  #renderBoard = () => {
    render(new FilterView(),this.#boardContainer);

    if (this.#boardFilms.length === 0) {
      render(new NoFilmView(), this.#boardContainer);
      return;
    }

    render(new SortView(), this.#boardContainer);
    render(this.#filmSectionComponent, this.#boardContainer);
    render(this.#filmListComponent, this.#siteFilmsList);

    for (let i = 0; i < Math.min(this.#boardFilms.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(this.#boardFilms[i], this.#boardComments);
    }

    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent,this.#siteFilmsList);

      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButton);
    }

  };
}
