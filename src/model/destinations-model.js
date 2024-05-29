import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations (destinations) {
    this.#destinations = destinations;
  }
}
