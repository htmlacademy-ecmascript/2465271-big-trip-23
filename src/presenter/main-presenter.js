import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import TripCreateView from '../view/trip-create-view';
import PointPresenter from './point-presenter';
import { render } from '../framework/render';
import { generateSorter } from '../mock/mock-sort';
import { isEmpty } from '../utils/task';

export default class MainPagePresenter {
  #boardContainer = null;
  #eventModel = null;
  #eventListComponent = null;
  #pointPresenters = new Map();

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
    this.#eventListComponent = new TripListView();
  }

  init() {
    this.#renderTripCreateView();
    this.#renderPoints(this.#eventModel);
  }

  #renderEmptyViewMessage () {
    render(new TripListEmptyView({filter: this.#eventModel.filters[0]}), this.#boardContainer);
  }

  #renderTripSortView({points}) {
    const sorters = generateSorter(points);
    render(new TripSortView({sorters}), this.#boardContainer);
  }

  #renderTripCreateView() {
    const offers = this.#eventModel.offers;
    const destinations = this.#eventModel.destinations;
    const point = this.#eventModel.defaultPoint;
    const eventTypes = this.#eventModel.eventTypes;
    const pointCreateComponent = new TripCreateView (
      offers,
      destinations,
      point,
      eventTypes,
    );
    render(pointCreateComponent, this.#eventListComponent.element);
  }

  #renderPoints({points}) {
    if (isEmpty(points)) {
      this.#renderEmptyViewMessage();
      return;
    }

    this.#renderTripSortView(this.#eventModel);
    render(this.#eventListComponent, this.#boardContainer);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint (point) {
    const offers = this.#eventModel.offers;
    const destinations = this.#eventModel.destinations;
    const eventTypes = this.#eventModel.eventTypes;
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
    });
    pointPresenter.init(offers, destinations, point, eventTypes);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList () {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
