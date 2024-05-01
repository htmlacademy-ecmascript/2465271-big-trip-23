import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { render } from '../render';

export default class MainPagePresenter {
  eventSortComponent = new TripSortView();
  eventListComponent = new TripListView();

  constructor({boardContainer, eventModel}) {
    this.boardContainer = boardContainer;
    this.eventModel = eventModel;
  }

  init() {
    this.eventOffers = [...this.eventModel.getOffers()];
    this.eventDestinations = [...this.eventModel.getDestinations()];
    this.eventPoints = [...this.eventModel.getPoints()];

    render(this.eventSortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    render(new TripEditView
    (
      {offerData: this.eventOffers},
      {destinationData: this.eventDestinations},
      {pointData: this.eventPoints},
    )
    , this.eventListComponent.getElement());

    render(new TripCreateView
    (
      {offerData: this.eventOffers},
      {destinationData: this.eventDestinations},
      {pointData: this.eventPoints},
    )
    , this.eventListComponent.getElement());

    for (let i = 2; i < this.eventPoints.length; i++) {
      render(new TripPointView
      (
        {offerData: this.eventOffers[i]},
        {destinationData: this.eventDestinations[i]},
        {pointData: this.eventPoints[i]},
      )
      , this.eventListComponent.getElement());
    }
  }
}
