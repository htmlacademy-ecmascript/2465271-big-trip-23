import dayjs from 'dayjs';

const POINT_DATE_FORMAT = 'MMM D';
const POINT_TIME_FORMAT = 'HH:mm';
const EDIT_TIME_FORMAT = 'DD/MM/YY HH:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumberElement = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomDescriptionPhoto = () => `https://loremflickr.com/248/152?random=${getRandomNumberElement(1,20)}`;

const displayEventTime = (time) => time ? dayjs(time).format(POINT_TIME_FORMAT) : '';

const displayEventDate = (date) => date ? dayjs(date).format(POINT_DATE_FORMAT) : '';

const displayEditTime = (dateTime) => dateTime ? dayjs(dateTime).format(EDIT_TIME_FORMAT) : '';

const getFirstWordCapitalize = (word) => word.split(' ').map((elem) => `${elem[0].toUpperCase()}${elem.slice(1).toLowerCase()}`).join(' ');

export {getRandomArrayElement, getRandomDescriptionPhoto, displayEventTime, displayEventDate, displayEditTime, getFirstWordCapitalize};
