import Observable from '../framework/observable';
// import { offersData } from '../mock/mock-offers';
// import { destinationsData } from '../mock/mock-destination';
import { pointsData } from '../mock/mock-points';
import { defaultEventPoint } from '../const';

export default class EventModel extends Observable {

  // #offers = [];
  // #destinations = [];
  #points = [];
  // #filters = [];
  // #sortTypes = [];
  #defaultPoint = [];
  // #eventTypes = [];

  init() {
    // this.#offers = offersData;
    // this.#destinations = destinationsData;
    this.#points = pointsData;
    // this.#filters = Object.values(FilterType);
    // this.#sortTypes = SortTypes;
    this.#defaultPoint = defaultEventPoint;
    // this.#eventTypes = EVENT_TYPES;
  }

  // get offers() {
  //   return this.#offers;
  // }

  // set offers (offers) {
  //   this.#offers = offers;
  // }

  // get destinations() {
  //   return this.#destinations;
  // }

  // set destinations(destinations) {
  //   this.#destinations = destinations;
  // }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  // get filters() {
  //   return this.#filters;
  // }

  // set filters(filters) {
  //   this.#filters = filters;
  // }

  // get sortTypes() {
  //   return this.#sortTypes;
  // }

  // set sortTypes(sortTypes) {
  //   this.#sortTypes = sortTypes;
  // }

  get defaultPoint() {
    return this.#defaultPoint;
  }

  set defaultPoint(defaultPoint) {
    this.#defaultPoint = defaultPoint;
  }

  // get eventTypes() {
  //   return this.#eventTypes;
  // }

  // set eventTypes(eventTypes) {
  //   this.#eventTypes = eventTypes;
  // }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}