import AbstractView from '../framework/view/abstract-view';
import { getFirstWordCapitalize } from '../utils/task';
import { SortTypes } from '../const';

const createSortElement = (sortType, currentSortType) => (
  `<div class="trip-sort__item trip-sort__item--${sortType}">
      <input id="sort-${sortType}" data-sort-type="${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"${sortType === currentSortType ? 'checked' : ''}${sortType === 'offers' || sortType === 'event' ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortType}">${getFirstWordCapitalize(sortType)}</label>
  </div>`
);

const createSortTemplate = (currentSortType) => {
  const sortItemTemplate = Object.values(SortTypes).map((sortType) => createSortElement(sortType, currentSortType)).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemTemplate}
    </form>`
  );
};

export default class TripSortView extends AbstractView {

  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
