import {render} from '../render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {

  init = (boardContainer, filmsModel) => {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;

    this.boardFilms = [...this.filmsModel.films];
    this.boardComments = [...this.filmsModel.comments];

    render(new PopupView(this.boardFilms[0], this.boardComments), this.boardContainer);
  };
}
