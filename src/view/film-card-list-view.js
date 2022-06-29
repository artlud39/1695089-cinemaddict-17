import AbstractView from '../framework/view/abstract-view.js';


const createFilmCardListTempalte = () => '<div class="films-list__container"></div>';

export default class  FilmCardListView extends AbstractView {

  get template() {
    return createFilmCardListTempalte();
  }
}
