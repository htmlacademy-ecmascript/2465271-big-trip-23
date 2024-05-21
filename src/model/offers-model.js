import Observable from '../framework/observable';
import { offersData } from '../mock/mock-offers';

export default class OffersModel extends Observable {
  #offers = [];

  init() {
    this.#offers = offersData;
  }

  get offers() {
    return this.#offers;
  }

  set offers (offers) {
    this.#offers = offers;
  }

  updateOffer(updateType, update) {
    const index = this.#offers.findIndex((offer) => offer.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#offers = [
      ...this.#offers.slice(0, index),
      update,
      ...this.#offers.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addOffer(updateType, update) {
    this.#offers = [
      update,
      ...this.#offers,
    ];

    this._notify(updateType, update);
  }

  deleteOffer(updateType, update) {
    const index = this.#offers.findIndex((offer) => offer.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#offers = [
      ...this.#offers.slice(0, index),
      ...this.#offers.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
