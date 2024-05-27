import Observable from '../framework/observable';
import { destinationsData } from '../mock/mock-destination';

export default class DestinationsModel extends Observable {
  #destinations = [];

  init() {
    this.#destinations = destinationsData;
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations (destinations) {
    this.#destinations = destinations;
  }
}
