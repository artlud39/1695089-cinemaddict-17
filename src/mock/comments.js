import {getRandomInteger} from '../utils/common.js';
import {getRandomCommetnText, emotions, authors} from '../const.js';
import dayjs from 'dayjs';

const getRandomDate = () => dayjs().add(getRandomInteger(-10,10), 'day');

const getRandomComments = () => ({
  id: getRandomInteger(1,100),
  author: authors[getRandomInteger(1, authors.length -1)],
  comment: getRandomCommetnText(),
  date: getRandomDate(),
  emotion: emotions[getRandomInteger(1, emotions.length -1)],
});

export {getRandomComments};
