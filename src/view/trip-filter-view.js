import AbstractView from '../framework/view/abstract-view';

const TRIP_FILTERS_NAMES = ['everything', 'future', 'present', 'past'];

const createFilterElement = (name) =>
  `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;

const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
  ${TRIP_FILTERS_NAMES.map((name) => createFilterElement(name)).join('')}
  </form>`;


export default class TripFilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
