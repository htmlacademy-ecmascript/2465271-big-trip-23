import { offersData } from '../mock/mock-offers';
import { destinationsData } from '../mock/mock-destination';
import { pointsData } from '../mock/mock-points';
import { FilterType, SORT_TYPES } from '../const';

export default class EventModel {

  #offers = [];
  #destinations = [];
  #points = [];
  #filters = [];
  #sortTypes = [];

  init() {
    this.#offers = offersData;
    this.#destinations = destinationsData;
    this.#points = pointsData;
    this.#filters = Object.values(FilterType);
    this.#sortTypes = SORT_TYPES;
  }

  get offers() {
    return this.#offers;
  }

  set offers (offers) {
    this.#offers = offers;
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  get filters() {
    return this.#filters;
  }

  set filters(filters) {
    this.#filters = filters;
  }

  get sortTypes() {
    return this.#sortTypes;
  }

  set sortTypes(sortTypes) {
    this.#sortTypes = sortTypes;
  }
}
