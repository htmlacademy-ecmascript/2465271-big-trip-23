import { FilterType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const PageMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createTripListEmptyTemplate = (filterType = FilterType.EVERYTHING) => {
  const currentPageMessageTextTipe = PageMessageTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${currentPageMessageTextTipe}
    </p>`
  );
};
export default class TripListEmptyView extends AbstractView {
  get template() {
    return createTripListEmptyTemplate();
  }
}
