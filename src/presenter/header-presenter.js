import TripFilterView from '../view/trip-filter-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../framework/render';
import { generateFilter } from '../mock/mock-filter';

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
    const filters = generateFilter(points);
    render(new TripFilterView({filters}) , this.boardContainer);
  }
}
