import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmCardListView from '../view/film-card-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';

export default class BoardPresenter {
  filmSectionComponent = new FilmsSectionView();
  filmListComponent = new FilmCardListView();

  init = (boardContainer, filmsModel) => {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;

    this.boardFilms = [...this.filmsModel.films];
    this.boardComments = [...this.filmsModel.comments];

    render(new FilterView(),this.boardContainer);
    render(new SortView(), this.boardContainer);
    render(this.filmSectionComponent, this.boardContainer);
    render(this.filmListComponent, this.filmSectionComponent);

    for(let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListComponent);
    }

    render(new ShowMoreButtonView(), this.boardContainer);
  };
}
