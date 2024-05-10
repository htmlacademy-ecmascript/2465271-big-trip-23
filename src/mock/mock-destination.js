import { getRandomDescriptionPhoto } from '../utils/task';

export const destinationsData = [
  {
    id: 1,
    description: '',
    name: 'Khabarovsk',
    pictures: []
  },
  {
    id: 2,
    description: 'Hamburg, is a beautiful city, a true asian pearl, with crowded streets. Hamburg, is a beautiful city, a true asian pearl, with crowded streets. Hamburg, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Hamburg',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      }
    ]
  },
  {
    id: 3,
    description: 'Bangkok, is a beautiful city, a true asian pearl, with crowded streets. Bangkok, is a beautiful city, a true asian pearl, with crowded streets. Bangkok, is a beautiful city, a true asian pearl, with crowded streets. Bangkok, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Bangkok',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
    ]
  },
  {
    id: 4,
    description: '',
    name: 'Caracas',
    pictures: []
  },
  {
    id: 5,
    description: 'Dubai, is a beautiful city, a true asian pearl, with crowded streets. Dubai, is a beautiful city, a true asian pearl, with crowded streets. Dubai, is a beautiful city, a true asian pearl, with crowded streets. Dubai, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Dubai',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
    ]
  },
  {
    id: 6,
    description: 'Tokyo, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tokyo',
    pictures: [
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
      {
        src: getRandomDescriptionPhoto(),
        description: 'Random photo'
      },
    ]
  },
];
