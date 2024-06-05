const POINT_DATE_FORMAT = 'MMM D';
const INFO_DATE_FORMAT = 'D MMM';
const POINT_TIME_FORMAT = 'HH:mm';
const EDIT_TIME_FORMAT = 'DD/MM/YY HH:mm';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const EmptyMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const TimeType = {
  MINUTES: 60,
  HOURS: 24,
};

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const defaultEventPoint = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[5],
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

export {
  FilterType,
  TimeType,
  EVENT_TYPES,
  EmptyMessageTextType,
  POINT_DATE_FORMAT,
  INFO_DATE_FORMAT,
  POINT_TIME_FORMAT,
  EDIT_TIME_FORMAT,
  SORT_TYPES,
  SortTypes,
  defaultEventPoint,
  Mode,
  UserAction,
  UpdateType
};
