import { createElement } from '../render';
import { FilterType } from '../const';

const PageMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createTripListEmptyTemplate(filterType = FilterType.EVERYTHING) {
  const currentPageMessageTextTipe = PageMessageTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${currentPageMessageTextTipe}
    </p>`
  );
}
export default class TripListEmptyView {
  getTemplate() {
    return createTripListEmptyTemplate();
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
