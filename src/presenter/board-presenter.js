import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmsSectionView from '../view/films-section-view.js';

export default class BoardPresenter {


  init = (boardContainer, filmsModel) => {
    const films = [...filmsModel.films];
    const comments = [...filmsModel.comments];
    console.log(films);
    console.log(comments);
    render(new FilterView(), boardContainer);
    render(new SortView(), boardContainer);
    render(new FilmsSectionView(), boardContainer);
  };
}
