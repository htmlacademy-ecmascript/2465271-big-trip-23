import { getRandomArrayElement, getRandomDescriptionPhoto } from '../utils';

const offersMockData = [
  {
    type: 'taxi',
    offers: [
      {option: 'Order Uber', price: 25, name: 'uber'}
    ]
  },
  {
    type: 'bus',
  },
  {
    type: 'train',
  },
  {
    type: 'ship',
  },
  {
    type: 'drive',
    offers: [
      {option: 'Rent a car', price: 200, name: 'car'}
    ]
  },
  {
    type: 'flight',
    offers: [
      {option: 'Add luggage', price: 30, name: 'luggage'},
      {option: 'Switch to comfort class', price: 100, name: 'comfort'},
      {option: 'Add meal', price: 15, name: 'meal'},
      {option: 'Choose seats', price: 5, name: 'seats'},
      {option: 'Travel by train', price: 40, name: 'train'}
    ]
  },
  {
    type: 'check-in',
    offers: [
      {option: 'Add breakfast', price: 50, name: 'breakfast'}
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {option: 'Book tickets', price: 40, name: 'tickets'},
      {option: 'Lunch in city', price: 30, name: 'lunch'}
    ]
  },
  {
    type: 'restaurant',
  },
];

const destinationsMockData = [
  {
    destination: 'Khabarovsk',
    dataFrom: '2019-07-10T22:55:56.845Z',
    dataTo: '2019-07-10T22:55:56.845Z',
    isFavorite: true,
    basePrice: 150
  },
  {
    destination: 'Hamburg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: [
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto()
    ],
    dataFrom: '2024-07-10T22:55:56.845Z',
    dataTo: '2024-07-10T22:55:56.845Z',
    isFavorite: true,
    basePrice: 250
  },
  {
    destination: 'Bangkok',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: [
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto()
    ],
    dataFrom: '2024-07-10T22:55:56.845Z',
    dataTo: '2024-07-12T08:55:56.845Z',
    isFavorite: false,
    basePrice: 520
  },
  {
    destination: 'Caracas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    dataFrom: '2014-07-10T22:55:56.845Z',
    dataTo: '2019-07-10T22:55:56.845Z',
    isFavorite: false,
    basePrice: 100
  },
  {
    destination: 'Almaty',
    photos: [
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto()
    ],
    dataFrom: '2024-02-10T22:55:56.845Z',
    dataTo: '2024-07-10T22:55:56.845Z',
    isFavorite: true,
    basePrice: 300
  },
  {
    destination: 'Dubai',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: [
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto()
    ],
    dataFrom: '2024-01-10T22:55:56.845Z',
    dataTo: '2024-03-10T22:55:56.845Z',
    isFavorite: true,
    basePrice: 1500
  },
  {
    destination: 'Copenhagen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    photos: [
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto(),
      getRandomDescriptionPhoto()
    ],
    dataFrom: '2025-03-10T10:55:56.845Z',
    dataTo: '2025-10-10T12:55:56.845Z',
    isFavorite: false,
    basePrice: 780
  },
];

const getRandomOffer = () => getRandomArrayElement(offersMockData);
const getRandomDestination = () => getRandomArrayElement(destinationsMockData);

export { getRandomOffer, getRandomDestination };
