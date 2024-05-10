import { filter } from '../utils/filter';

const generateFilter = (tasks) => Object.entries(filter)
  .map(([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(tasks).length,
  }),
  );

export {generateFilter};
