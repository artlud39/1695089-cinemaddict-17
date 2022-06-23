import {getRandomInteger} from '../utils/common.js';
import {emotions, authors} from '../const.js';
import dayjs from 'dayjs';

const commentTexts = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus' ,
  'In rutrum ac purus sit amet tempus',
];

const getRandomCommetnText = () => commentTexts.slice(getRandomInteger(1,5), getRandomInteger(6,10)).join('.');

const maxDaysGap = 10;
const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

const getRandomDate = () => dayjs().add(daysGap, 'day').toISOString();

const getRandomComments = () => ({
  id: getRandomInteger(1,100),
  author: authors[getRandomInteger(1, authors.length -1)],
  comment: getRandomCommetnText(),
  date: getRandomDate(),
  emotion: emotions[getRandomInteger(1, emotions.length -1)],
});

export {getRandomComments};
