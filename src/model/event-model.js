import { getRandomOffer, getRandomDestination } from '../mock/event-data';

const EVENT_COUNT = 9;
// const EVENT_TYPE_COUNT = 9;

export default class EventModel {
  offers = Array.from({length: EVENT_COUNT}, getRandomOffer);
  destinations = Array.from({length: EVENT_COUNT}, getRandomDestination);
  // points = Array.from({length: EVENT_COUNT}, getRandomPoint);

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

  // getPoints() {
  //   return this.points;
  // }
}
