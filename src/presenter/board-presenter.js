import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';
import FilmPresenter from './film-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #filmSectionComponent = new FilmsSectionView();
  #filmListComponent = new FilmCardListView();
  #sortComponent = new SortView();
  #filterComponent = new FilterView();
  #noFilmComponent = new NoFilmView();
  #siteFilmsList = this.#filmSectionComponent.element.querySelector('.films-list');
  #showMoreButtonComponent = new ShowMoreButtonView();

  #boardFilms = [];
  #boardComments = [];
  #filmPresenter = new Map();
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
    this.#renderFilms(this.#renderedFilmCount,  this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#boardFilms.length <= this.#renderedFilmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilter = () => {
    render(this.#filterComponent, this.#boardContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
  };

  #renderFilm = (film, comments) => {
    const filmPresenter = new FilmPresenter(this.#filmListComponent.element);
    filmPresenter.init(film,comments);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#boardFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, this.#boardComments));
  };

  #renderFilmList = () => {
    render(this.#filmListComponent, this.#siteFilmsList);

    this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));

    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderNoFilm = () => {
    render(this.#noFilmComponent.element, this.#boardContainer);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent,this.#siteFilmsList);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButton);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderBoard = () => {
    this.#renderFilter();
    this.#renderSort();
    render(this.#filmSectionComponent, this.#boardContainer);

    if (this.#boardFilms.length === 0) {
      this.#renderNoFilm();
      return;
    }

    this.#renderFilmList();
  };
}
