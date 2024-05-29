import Observable from '../framework/observable';
// import { offersData } from '../mock/mock-offers';

export default class OffersModel extends Observable {
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
  }

  // init() {
  //   this.#offers = offersData;
  // }

  get offers() {
    return this.#offers;
  }

  set offers (offers) {
    this.#offers = offers;
  }
}
