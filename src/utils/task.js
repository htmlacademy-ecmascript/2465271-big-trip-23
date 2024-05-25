import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { TimeType, FilterType, defaultEventPoint, POINT_DATE_FORMAT, POINT_TIME_FORMAT, EDIT_TIME_FORMAT } from '../const';
import { getRandomNumberElement } from './common';

const getRandomDescriptionPhoto = () => `https://loremflickr.com/248/152?random=${getRandomNumberElement(1,20)}`;

const displayEventTime = (time) => time ? dayjs(time).format(POINT_TIME_FORMAT) : '';

const displayEventDate = (date) => date ? dayjs(date).format(POINT_DATE_FORMAT) : '';

const displayEditTime = (dateTime) => dateTime ? dayjs(dateTime).format(EDIT_TIME_FORMAT) : '';

const getFirstWordCapitalize = (word) => word.split(' ').map((elem) => `${elem[0].toUpperCase()}${elem.slice(1).toLowerCase()}`).join('');

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

const sortDefaultByDay = (tripPoints) => [...tripPoints].sort((a, b) => new Date (a.dateFrom).getTime() - new Date (b.dateFrom).getTime());

const sortByPrice = (tripPoints) => [...tripPoints].sort((a, b) => b.basePrice - a.basePrice);

const sortByTime = (tripPoints) => [...tripPoints].sort((a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom)));

const filterTripByEverything = (tripPoints) => tripPoints;

const filterTripByPast = (tripPoints) => tripPoints.filter((trip) => new Date (trip.dateTo).getTime() < Date.now());

const filterTripByPresent = (tripPoints) => tripPoints.filter((trip) => new Date (trip.dateFrom).getTime() <= Date.now() && new Date (trip.dateTo).getTime() >= Date.now());

const filterTripByFuture = (tripPoints) => tripPoints.filter((trip) => new Date (trip.dateFrom).getTime() > Date.now());

const isEmpty = (data) => data.length === 0;

function randomeId () {
  return {
    id: nanoid(),
    ...defaultEventPoint
  };
}

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => filterTripByEverything(tripPoints),
  [FilterType.PAST]: (tripPoints) => filterTripByPast(tripPoints),
  [FilterType.PRESENT]: (tripPoints) => filterTripByPresent(tripPoints),
  [FilterType.FUTURE]: (tripPoints) => filterTripByFuture(tripPoints),
};

export {
  getRandomDescriptionPhoto,
  displayEventTime,
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
  randomeId
};
