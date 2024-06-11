import dayjs from 'dayjs';
import { timeType, FilterType, POINT_DATE_FORMAT, INFO_DATE_FORMAT, POINT_TIME_FORMAT, EDIT_TIME_FORMAT } from '../const';
import { getRandomNumberElement } from './common';

const getRandomDescriptionPhoto = () => `https://loremflickr.com/248/152?random=${getRandomNumberElement(1,20)}`;

const displayEventTime = (time) => time ? dayjs(time).format(POINT_TIME_FORMAT) : '';

const displayInfoDate = (date) => date ? dayjs(date).format(INFO_DATE_FORMAT) : '';

const displayEventDate = (date) => date ? dayjs(date).format(POINT_DATE_FORMAT) : '';

const displayEditTime = (dateTime) => dateTime ? dayjs(dateTime).format(EDIT_TIME_FORMAT) : '';

const getFirstWordCapitalize = (word) => word.split(' ').map((letter) => `${letter[0].toUpperCase()}${letter.slice(1).toLowerCase()}`).join('');

const getDuration = (dateFrom, dateTo) => {
  const timeDurations = [
    {sign:'D', value: dayjs(dateTo).diff(dateFrom, 'd')},
    {sign: 'H', value: dayjs(dateTo).diff(dateFrom, 'h') % timeType.HOURS},
    {sign: 'M', value: dayjs(dateTo).diff(dateFrom, 'm') % timeType.MINUTES},
  ];
  const resultDurations = [];
  for (let i = 0; i < timeDurations.length; i++) {
    if (timeDurations[i].value && timeDurations[i].value < 10) {
      resultDurations.push(`0${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (timeDurations[i].value && timeDurations[i].value >= 10) {
      resultDurations.push(`${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (!timeDurations[i].value && resultDurations.length !== 0) {
      resultDurations.push(`00${timeDurations[i].sign} `);
    }
  }
  return resultDurations.join('');
};

const sortDefaultByDay = (tripPoints) => [...tripPoints].sort((leftPoint, rightPoint) => new Date (leftPoint.dateFrom).getTime() - new Date (rightPoint.dateFrom).getTime());

const sortByPrice = (tripPoints) => [...tripPoints].sort((leftPoint, rightPoint) => rightPoint.basePrice - leftPoint.basePrice);

const sortByTime = (tripPoints) => [...tripPoints].sort((leftPoint, rightPoint) => dayjs(rightPoint.dateTo).diff(dayjs(rightPoint.dateFrom)) - dayjs(leftPoint.dateTo).diff(dayjs(leftPoint.dateFrom)));

const filterTripByEverything = (tripPoints) => tripPoints;

const filterTripByPast = (tripPoints) => tripPoints.filter((trip) => new Date (trip.dateTo).getTime() < Date.now());

const filterTripByPresent = (tripPoints) => tripPoints.filter((trip) => new Date (trip.dateFrom).getTime() <= Date.now() && new Date (trip.dateTo).getTime() >= Date.now());

const filterTripByFuture = (tripPoints) => tripPoints.filter((trip) => new Date (trip.dateFrom).getTime() > Date.now());

const isEmpty = (data) => data.length === 0;

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => filterTripByEverything(tripPoints),
  [FilterType.PAST]: (tripPoints) => filterTripByPast(tripPoints),
  [FilterType.PRESENT]: (tripPoints) => filterTripByPresent(tripPoints),
  [FilterType.FUTURE]: (tripPoints) => filterTripByFuture(tripPoints),
};

export {
  getRandomDescriptionPhoto,
  displayEventTime,
  displayInfoDate,
  displayEventDate,
  displayEditTime,
  getFirstWordCapitalize,
  getDuration,
  sortDefaultByDay,
  sortByPrice,
  sortByTime,
  filterTripByEverything,
  filterTripByPast,
  filterTripByPresent,
  filterTripByFuture,
  isEmpty,
  filter,
};
