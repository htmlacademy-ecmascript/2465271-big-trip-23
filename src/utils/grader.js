const generateSorterAndFilter = (grader, tasks) => Object.entries(grader)
  .map(([sorterType, sorterPoints]) => ({
    type: sorterType,
    count: sorterPoints(tasks).length,
  }),
  );

export {generateSorterAndFilter};
