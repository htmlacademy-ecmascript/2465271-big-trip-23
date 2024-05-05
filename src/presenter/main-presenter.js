import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { getDefaultEventPoint } from '../utils';
import { render } from '../render';

export default class MainPagePresenter {
  eventSortComponent = new TripSortView();
  eventListComponent = new TripListView();

  constructor({boardContainer, eventModel}) {
    this.boardContainer = boardContainer;
    this.eventModel = eventModel;
  }

  init() {
    const offers = this.eventModel.getOffers();
    const destinations = this.eventModel.getDestinations();
    const points = this.eventModel.getPoints();

    render(this.eventSortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    render(new TripEditView
    (offers, destinations, points[3])
    , this.eventListComponent.getElement());

    render(new TripCreateView
    (offers, destinations, getDefaultEventPoint())
    , this.eventListComponent.getElement());

    for (const point of points) {
      render(new TripPointView
      (offers, destinations, point)
      , this.eventListComponent.getElement());
    }
  }
}
