import dayjs from 'dayjs';
import { TimeType, eventTypes } from './const';

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

const getDuration = (dateFrom, dateTo) => {
  const timeDurations = [
    {sign:'D', value: dayjs(dateTo).diff(dateFrom, 'd')},
    {sign: 'H', value: dayjs(dateTo).diff(dateFrom, 'h') % TimeType.HOURS},
    {sign: 'M', value: dayjs(dateTo).diff(dateFrom, 'm') % TimeType.MINUTES},
  ];
  const resultDuration = [];
  for (let i = 0; i < timeDurations.length; i++) {
    if (timeDurations[i].value && timeDurations[i].value < 10) {
      resultDuration.push(`0${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (timeDurations[i].value && timeDurations[i].value >= 10) {
      resultDuration.push(`${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (!timeDurations[i].value && resultDuration.length !== 0) {
      resultDuration.push(`00${timeDurations[i].sign} `);
    }
  }
  return resultDuration.join('');
};

const getDefaultEventPoint = () => ({
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: 0,
  isFavorite: false,
  offers: [],
  type: eventTypes[5],
});

export {
  getRandomArrayElement,
  getRandomDescriptionPhoto,
  displayEventTime,
  displayEventDate,
  displayEditTime,
  getFirstWordCapitalize,
  getDuration,
  getRandomNumberElement,
  getDefaultEventPoint,
};
