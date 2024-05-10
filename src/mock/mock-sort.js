import { sorter } from '../utils/sort';

const generateSorter = (tasks) => Object.entries(sorter)
  .map(([sorterType, sorterPoints]) => ({
    type: sorterType,
    count: sorterPoints(tasks).length,
  }),
  );

export {generateSorter};
