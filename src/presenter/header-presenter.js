import FilterView from '../view/trip-filter-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../render';

export default class HeaderPagePresenter {
  eventFilterComponent = new FilterView();
  eventInfoComponent = new TripInfoView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.eventFilterComponent, this.boardContainer);
    render(this.eventInfoComponent, this.boardContainer.closest('.trip-main'), RenderPosition.AFTERBEGIN);
  }
}
