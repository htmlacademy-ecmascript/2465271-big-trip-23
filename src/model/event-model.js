import { offers } from '../mock/mock-offers';
import { destinations } from '../mock/mock-destination';
import { points } from '../mock/mock-points';

export default class EventModel {

  #offers;
  #destinations;
  #points;

  constructor () {
    this.#offers = [];
    this.#destinations = [];
    this.#points = [];
  }

  init() {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#points = points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get points() {
    return this.#points;
  }
}
