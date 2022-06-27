import dayjs from 'dayjs';

const humanizeCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

export {humanizeCommentDate};
