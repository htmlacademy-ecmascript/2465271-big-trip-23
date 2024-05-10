import { FilterType } from '../const';
import { filterTripByEverything, filterTripByPast, filterTripByPresent, filterTripByFuture } from './task';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => filterTripByEverything(tripPoints),
  [FilterType.PAST]: (tripPoints) => filterTripByPast(tripPoints),
  [FilterType.PRESENT]: (tripPoints) => filterTripByPresent(tripPoints),
  [FilterType.FUTURE]: (tripPoints) => filterTripByFuture(tripPoints),
};

export {filter};
