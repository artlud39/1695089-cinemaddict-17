import FilmsModel from './model/films-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import ProfileView from './view/profile-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter();
boardPresenter.init(siteMainElement, filmsModel);


render(new ProfileView(), siteHeaderElement);

const URL1 = 'https://17.ecmascript.pages.academy/cinemaddict/movies';
const URL2 = 'https://17.ecmascript.pages.academy/cinemaddict/comments/11';
const KEY = 'Basic er883jdzbdw';

fetch(URL1, {
  method: 'GET',
  headers: {
    Authorization: KEY
  }
}).then((res) => console.log(res.json()));


fetch(URL2, {
  method: 'GET',
  headers: {
    Authorization: KEY
  }
}).then((res) => console.log(res.json()));
