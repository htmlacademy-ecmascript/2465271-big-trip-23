import { SortTypes } from '../const';
import { sortDefaultByDay, sortByPrice, sortByTime } from './task';

const sorter = {
  [SortTypes.DAY]: (tripPoints) => sortDefaultByDay(tripPoints),
  [SortTypes.EVENT]: () => [],
  [SortTypes.TIME]: (tripPoints) => sortByTime(tripPoints),
  [SortTypes.PRICE]: (tripPoints) => sortByPrice(tripPoints),
  [SortTypes.OFFERS]: () => [],
};

export {sorter};
