import {createElement} from '../render.js';
import {humanizeFilmDuration, humanizeDateDayMonthYear} from '../utils/films.js';
import {humanizeCommentDate} from '../utils/comments.js';

import {emotions} from '../const.js';

const createPopupTempalte = (film, allComments) => {
  const {comments} = film;
  const filmInfo = film.filmInfo;
  const {poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, runtime, release, genre, description} = filmInfo;
  const writersList = writers.join(', ');
  const actorsList = actors.join(', ');
  const filmDuration = humanizeFilmDuration(runtime);
  const releaseCountry = release.releaseCountry;
  const releaseDate = humanizeDateDayMonthYear(release.date);
  const commentDay = humanizeCommentDate(comments.date);

  const createGenresList = (genres) => (
    genres.map((element) => `<span class="film-details__genre">${element}</span>`).join(' ')
  );

  const renderGenres = (genres) => (`
    <tr class="film-details__row">
      <td class="film-details__term">${genres.length > 1 ?'Genres': 'Genre'}</td>
      <td class="film-details__cell">
      ${createGenresList(genres)}
    </tr>`);

  const genresFilm = renderGenres(genre);

  const generateEmotionsList = (emojies) => (
    emojies.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`).join(' ')
  );

  const renderEmotions = (emojies) => (`
  <div class="film-details__emoji-list">
    ${generateEmotionsList(emojies)}
  </div>`);

  const emotionsComments = renderEmotions(emotions);

  const generateCommetnsList = (commentaries) => commentaries
    .map((commentary) => {
      const isThisFilm = comments.includes(commentary.id);
      if (isThisFilm) {
        return (`<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${commentary.emotion}.png" width="55" height="55" alt="emoji-${commentary.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${commentary.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${commentary.author}</span>
            <span class="film-details__comment-day">${commentDay}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`);
      }
    }).join(' ');

  const renderCommetns = (commetns) => (`
  <ul class="film-details__comments-list">
  ${generateCommetnsList(commetns)}
  </ul>`);

  const commentsList = renderCommetns(allComments);

  return  (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writersList}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actorsList}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            ${genresFilm}
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        ${commentsList}
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          ${emotionsComments}
        </div>
      </section>
    </div>
  </form>
</section>`);
};


export default class  PopupView {
  constructor(film, coomments) {
    this.film = film;
    this.coomments = coomments;
  }

  getTemplate() {
    return createPopupTempalte(this.film, this.coomments);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
