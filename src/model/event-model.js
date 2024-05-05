import { offers } from '../mock/mock-offers';
import { destinations } from '../mock/mock-destination';
import { points } from '../mock/mock-points';
export default class EventModel {
  constructor () {
    this.offers = [];
    this.destinations = [];
    this.points = [];
  }

  init() {
    this.offers = offers;
    this.destinations = destinations;
    this.points = points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

  getPoints() {
    return this.points;
  }
}
