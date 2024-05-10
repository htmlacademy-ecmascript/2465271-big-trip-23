import { SortTypes } from '../const';
import { sortDefaultByDay, sortByPrice, sortByTime, returnEmptyArray } from './task';

const sorter = {
  [SortTypes.DAY]: (tripPoints) => sortDefaultByDay(tripPoints),
  [SortTypes.EVENT]: () => returnEmptyArray(),
  [SortTypes.TIME]: (tripPoints) => sortByTime(tripPoints),
  [SortTypes.PRICE]: (tripPoints) => sortByPrice(tripPoints),
  [SortTypes.OFFERS]: () => returnEmptyArray(),
};

export {sorter};
