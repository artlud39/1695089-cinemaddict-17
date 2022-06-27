import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #filmSectionComponent = new FilmsSectionView();
  #filmListComponent = new FilmCardListView();
  #siteFilmsList = this.#filmSectionComponent.element.querySelector('.films-list');

  #boardFilms = [];
  #boardComments = [];

  init = (boardContainer, filmsModel) => {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;

    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardComments = [...this.#filmsModel.comments];

    render(new FilterView(),this.#boardContainer);
    render(new SortView(), this.#boardContainer);
    render(this.#filmSectionComponent, this.#boardContainer);
    render(this.#filmListComponent, this.#siteFilmsList);

    for (let i = 0; i < this.#boardFilms.length; i++) {
      this.#renderFilm(this.#boardFilms[i], this.#boardComments);
    }

    render(new ShowMoreButtonView(), this.#siteFilmsList);
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

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      replaceFilmToPopup();
      document.addEventListener('keydown',onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replacePopupToFilm();
      document.removeEventListener('keydown',onEscKeyDown);

    });

    render(filmComponent, this.#filmListComponent.element);
  };
}
