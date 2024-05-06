import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { getDefaultEventPoint } from '../utils';
import { render } from '../framework/render';

export default class MainPagePresenter {
  #boardContainer = null;
  #eventModel = null;
  #eventSortComponent = new TripSortView();
  #eventListComponent = new TripListView();

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
  }

  init() {
    const offers = this.#eventModel.offers;
    const destinations = this.#eventModel.destinations;
    const points = this.#eventModel.points;

    render(this.#eventSortComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    render(new TripEditView
    (offers, destinations, points[3])
    , this.#eventListComponent.element);

    render(new TripCreateView
    (offers, destinations, getDefaultEventPoint())
    , this.#eventListComponent.element);

    for (const point of points) {
      render(new TripPointView
      (offers, destinations, point)
      , this.#eventListComponent.element);
    }
  }
}
