import TripListView from '../view/trip-list-view';
import SortView from '../view/trip-sort-view';
import FormTripEditView from '../view/trip-edit-view';
import FormTripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { render } from '../render';

export default class MainPagePresenter {
  eventSortComponent = new SortView();
  eventListComponent = new TripListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.eventSortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new FormTripEditView(), this.eventListComponent.getElement());
    render(new FormTripCreateView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.eventListComponent.getElement());
    }
  }
}
