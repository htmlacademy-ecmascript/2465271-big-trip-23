import TripFilterView from '../view/trip-filter-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../framework/render';
import { generateSorterAndFilter } from '../mock/mock-sort-filter';
import { filter } from '../utils/filter';

export default class HeaderPagePresenter {
  #eventModel = null;
  eventInfoComponent = new TripInfoView();

  constructor({boardContainer, eventModel}) {
    this.boardContainer = boardContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#renderTripFilterView(this.#eventModel);
    render(this.eventInfoComponent, this.boardContainer.closest('.trip-main'), RenderPosition.AFTERBEGIN);
  }

  #renderTripFilterView ({points}) {
    const filters = generateSorterAndFilter(filter, points);
    render(new TripFilterView({filters}) , this.boardContainer);
  }
}
