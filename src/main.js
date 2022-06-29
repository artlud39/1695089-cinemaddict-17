import FilmsModel from './model/films-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import ProfileView from './view/profile-view.js';
import {render} from './framework/render.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');

const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter(siteMainElement, filmsModel);

render(new ProfileView(), siteHeaderElement);
boardPresenter.init();

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
