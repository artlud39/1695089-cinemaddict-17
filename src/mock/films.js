import {getRandomInteger, getRandomIntegerFloating} from '../utils/common.js';
import {actors, posters, countries, titles, genres} from '../const.js';
import dayjs from 'dayjs';

const descriptions = [
  'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  'Cras aliquet varius magna, non porta ligula feugiat eget."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  'In rutrum ac purus sit amet tempus."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee."Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
];

const writers = ['Eliza Chapman', 'Steven Fuller', 'Clifford Stevens', 'Nicholas Thomas', 'Ada Day'];
const alternativeTitle = ['Laziness Who Sold Themselves', 'In rutrum ac purus sit amet tempus', 'Nunc fermentum tortor ac porta dapibus'];

const getRandomActors = () => actors.slice(getRandomInteger(1,3),getRandomInteger(4,8));
const getRandomPosters = () => `${'images/posters/'}${posters[getRandomInteger(1,posters.length -1)]}`;
const getRandomTotalRating = () => +getRandomIntegerFloating(1.1, 9.9).toFixed(1);

const getRandomGenres = () => genres.slice(getRandomInteger(1, 4));

const getRandomFilms = () => ({
  id: getRandomInteger(1,10),
  comments: [getRandomInteger(1,10),getRandomInteger(1,10)],
  filmInfo: {
    title: titles[getRandomInteger(0, titles.length -1)],
    alternativeTitle: alternativeTitle[getRandomInteger(1,alternativeTitle.length - 1)],
    totalRating: getRandomTotalRating(),
    poster: getRandomPosters(),
    ageRating: getRandomInteger(0,21),
    director: actors[getRandomInteger(0, actors.length -1)],
    writers: writers.slice(getRandomInteger(1, 4)),
    actors: getRandomActors(),
    release: {
      date: dayjs().toISOString(),
      releaseCountry: countries[getRandomInteger(1,countries.length - 1)]
    },
    runtime: getRandomInteger(60, 125),
    genre: getRandomGenres(),
    description: descriptions[getRandomInteger(1,descriptions.length - 1)]
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0,1)),
    alreadyWatched: Boolean(getRandomInteger(0,1)),
    watchingDate: dayjs().toISOString(),
    favorite: Boolean(getRandomInteger(0,1))
  }
});

export {getRandomFilms};
