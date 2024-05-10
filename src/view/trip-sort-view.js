import AbstractView from '../framework/view/abstract-view';

const createSortElement = (sorters, isChecked) => {
  const {type, count} = sorters;
  return (
    `<div class="trip-sort__item
    trip-sort__item--${type}">
    <input
     id="sort-${type}"
     class="trip-sort__input
     visually-hidden"
     type="radio"
     name="trip-sort"
     value="sort-${type}"
     ${isChecked ? 'checked' : ''}
     ${count === 0 ? 'disabled' : ''}
     >
    <label
    class="trip-sort__btn"
    for="sort-${type}">${type}
    </label>
  </div>`
  );
};

const createSortTemplate = (sorters) => {
  const sortItemTemplate = sorters
    .map((sorter, index) => createSortElement(sorter, index === 0)).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemTemplate}
    </form>`
  );
};

export default class TripSortView extends AbstractView {

  #sorters = null;

  constructor({sorters}) {
    super();
    this.#sorters = sorters;
  }

  get template() {
    return createSortTemplate(this.#sorters);
  }
}
