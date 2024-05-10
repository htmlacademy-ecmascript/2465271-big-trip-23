import AbstractView from '../framework/view/abstract-view';
import { getFirstWordCapitalize } from '../utils/task';

const createFilterElement = (filter, isChecked) => {
  const {type, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
       id="filter-${type}"
       class="trip-filters__filter-input  visually-hidden"
       type="radio" name="trip-filter"
       value="${type}"
       ${isChecked ? 'checked' : ''}
       ${count === 0 ? 'disabled' : ''}
       />
      <label
      class="trip-filters__filter-label"
      for="filter-${type}">${getFirstWordCapitalize(type)}
      </label>
  </div>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterElement(filter, index === 0)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
    </form>`
  );
};

export default class TripFilterView extends AbstractView {

  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
