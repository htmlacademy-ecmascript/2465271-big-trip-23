import { getRandomArrayElement, getRandomDescriptionPhoto } from '../utils';

const offersMockData = [
  {
    type: 'taxi',
    offers: [
      {id: '1', title: 'Order Uber', price: 25}
    ]
  },
  {
    type: 'bus',
    offers: [{id: '2'}]
  },
  {
    type: 'train',
    offers: [{id: '3'}]
  },
  {
    type: 'ship',
    offers: [{id: '4'}]
  },
  {
    type: 'drive',
    offers: [
      {id: '5', title: 'Rent a car', price: 200}
    ]
  },
  {
    type: 'flight',
    offers: [
      {id: '6', title: 'Add luggage', price: 30},
      {id: '6', title: 'Switch to comfort class', price: 100},
      {id: '6', title: 'Add meal', price: 15},
      {id: '6', title: 'Choose seats', price: 5},
      {id: '6', title: 'Travel by train', price: 40}
    ]
  },
  {
    type: 'check-in',
    offers: [
      {id: '7', title: 'Add breakfast', price: 50}
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {id: '8', title: 'Book tickets', price: 40},
      {id: '8', title: 'Lunch in city', price: 30}
    ]
  },
  {
    type: 'restaurant',
    offers: [{id: '9'}]
  },
];

const destinationsMockData = [
  {
    id: '1',
    description: 'Khabarovsk, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Khabarovsk',
    pictures: []
  },
  {
    id: '2',
    description: 'Hamburg, is a beautiful city, a true asian pearl, with crowded streets.',
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
    id: '3',
    description: 'Bangkok, is a beautiful city, a true asian pearl, with crowded streets.',
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
    id: '4',
    description: 'Caracas, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Caracas',
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
    id: '5',
    description: 'Dubai, is a beautiful city, a true asian pearl, with crowded streets.',
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
    id: '6',
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
  {
    id: '7',
    description: 'Seoul, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Seoul',
    pictures: []
  },
  {
    id: '8',
    description: 'HongKong, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'HongKong',
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
    id: '9',
    description: 'Copenhagen, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Copenhagen',
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
];

const pointsMockData = [
  {
    id: '1',
    basePrice: 1150,
    isFavorite: true,
    dataFrom: '2024-06-10T22:55:56.845Z',
    dataTo: '2024-06-16T10:45:56.845Z',
  },
  {
    id: '2',
    basePrice: 200,
    isFavorite: false,
    dataFrom: '2024-10-10T10:55:56.845Z',
    dataTo: '2024-10-22T16:32:56.845Z',
  },
  {
    id: '3',
    basePrice: 450,
    isFavorite: true,
    dataFrom: '2024-11-10T08:26:56.845Z',
    dataTo: '2024-11-10T08:58:56.845Z',
  },
  {
    id: '4',
    basePrice: 840,
    isFavorite: false,
    dataFrom: '2024-08-10T10:55:56.845Z',
    dataTo: '2024-08-10T16:19:56.845Z',
  },
  {
    id: '5',
    basePrice: 150,
    isFavorite: true,
    dataFrom: '2024-09-10T15:35:56.845Z',
    dataTo: '2024-09-15T20:55:56.845Z',
  },
  {
    id: '6',
    basePrice: 2300,
    isFavorite: true,
    dataFrom: '2024-02-10T08:55:56.845Z',
    dataTo: '2024-03-12T20:55:56.845Z',
  },
  {
    id: '7',
    basePrice: 542,
    isFavorite: false,
    dataFrom: '2024-04-28T12:40:56.845Z',
    dataTo: '2024-05-11T20:15:56.845Z',
  },
  {
    id: '8',
    basePrice: 1450,
    isFavorite: true,
    dataFrom: '2024-12-10T22:55:56.845Z',
    dataTo: '2024-12-11T20:55:56.845Z',
  },
  {
    id: '9',
    basePrice: 250,
    isFavorite: true,
    dataFrom: '2024-10-10T22:55:56.845Z',
    dataTo: '2024-10-11T20:55:56.845Z',
  },
];

const getRandomOffer = () => getRandomArrayElement(offersMockData);
const getRandomDestination = () => getRandomArrayElement(destinationsMockData);
const getRandomPoint = () => getRandomArrayElement(pointsMockData);

export { getRandomOffer, getRandomDestination, getRandomPoint };
