import Observable from '../framework/observable';
import { pointsData } from '../mock/mock-points';
import { defaultEventPoint } from '../const';

export default class EventModel extends Observable {

  #points = [];
  #defaultPoint = [];

  init() {
    this.#points = pointsData;
    this.#defaultPoint = defaultEventPoint;
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  get defaultPoint() {
    return this.#defaultPoint;
  }

  set defaultPoint(defaultPoint) {
    this.#defaultPoint = defaultPoint;
  }

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
