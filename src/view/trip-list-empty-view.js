import { EmptyMessageTextType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createTripListEmptyTemplate = (filterType) => {
  const currentPageMessageTextTipe = EmptyMessageTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${currentPageMessageTextTipe}
    </p>`
  );
};
export default class TripListEmptyView extends AbstractView {
  #filter = '';

  constructor({filter}) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createTripListEmptyTemplate(this.#filter);
  }
}
