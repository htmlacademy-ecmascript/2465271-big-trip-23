const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumberElement = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const updatePoint = (points, update) => points.map((point) => point.id === update.id ? update : point);

export {
  getRandomArrayElement,
  getRandomNumberElement,
  updatePoint,
};
