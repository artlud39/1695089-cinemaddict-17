import dayjs from 'dayjs';

const humanizeDateYears = (date) => dayjs(date).format('YYYY');
const humanizeDateDayMonthYear = (date) => dayjs(date).format('DD MMMM YYYY');

const getShortdescription = (description) => {
  if (description.length >= 140) {
    const shortDescription = `${description.slice(0,140)}${'...'}`;
    return shortDescription;
  }
  return description;
};

const humanizeFilmDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - (hours * 60);
  return `${hours}h ${minutes}m`;
};

export {humanizeDateYears, getShortdescription, humanizeFilmDuration, humanizeDateDayMonthYear};
