import { createElement } from '../render';

const TRIP_SORT_NAMES = ['day', 'event', 'time', 'price', 'offers'];

const createSortElement = (name) =>
  `<div class="trip-sort__item  trip-sort__item--${name}">
    <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}">
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>`;

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${TRIP_SORT_NAMES.map((name) => createSortElement(name)).join('')}
  </form>`;

export default class TripSortView {
  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
