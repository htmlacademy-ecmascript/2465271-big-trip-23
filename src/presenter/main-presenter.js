import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { render } from '../render';

export default class MainPagePresenter {
  eventSortComponent = new TripSortView();
  eventListComponent = new TripListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.eventSortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new TripEditView(), this.eventListComponent.getElement());
    render(new TripCreateView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.eventListComponent.getElement());
    }
  }
}
