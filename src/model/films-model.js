import {getRandomFilms} from '../mock/films.js';
import {getRandomComments} from '../mock/comments.js';

export default class FilmsModel {
  #films = Array.from({length: 4}, getRandomFilms);
  #comments = Array.from({length: 10}, getRandomComments);

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
