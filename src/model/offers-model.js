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
}
