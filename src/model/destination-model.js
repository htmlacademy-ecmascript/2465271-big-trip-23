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

  updateDestination(updateType, update) {
    const index = this.#destinations.findIndex((destination) => destination.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#destinations = [
      ...this.#destinations.slice(0, index),
      update,
      ...this.#destinations.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addDestination(updateType, update) {
    this.#destinations = [
      update,
      ...this.#destinations,
    ];

    this._notify(updateType, update);
  }

  deleteDestination(updateType, update) {
    const index = this.#destinations.findIndex((destination) => destination.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#destinations = [
      ...this.#destinations.slice(0, index),
      ...this.#destinations.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
