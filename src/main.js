import FilmsModel from './model/films-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ProfileView from './view/profile-view.js';
import {render} from './render.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');

const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter();
const popupPresenter = new PopupPresenter();
boardPresenter.init(siteMainElement, filmsModel);
popupPresenter.init(siteBodyElement,filmsModel);


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
