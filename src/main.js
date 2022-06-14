import BoardPresenter from './presenter/board-presenter.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FilmCardView from './view/film-card-view.js';
import FilmCardListView from './view/film-card-list-view.js';
import ProfileView from './view/profile-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const boardPresenter = new BoardPresenter();
boardPresenter.init(siteMainElement);
const siteFilmList = siteMainElement.querySelector('.films-list');
render(new FilmCardListView, siteFilmList);
const siteFilmContainer = siteMainElement.querySelector('.films-list__container');

for(let i = 0; i < 5; i++) {
  render(new FilmCardView, siteFilmContainer);
}

render(new ShowMoreButtonView, siteFilmList);
render(new ProfileView, siteHeaderElement);
