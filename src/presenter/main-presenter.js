import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import TripCreateView from '../view/trip-create-view';
import PointPresenter from './point-presenter';
import { render } from '../framework/render';
import { generateSorter } from '../mock/mock-sort';
import { isEmpty } from '../utils/task';
import { updatePoint } from '../utils/common';

export default class MainPagePresenter {
  #boardContainer = null;
  #eventModel = null;
  #eventListComponent = null;
  #points = [];
  #pointPresenters = new Map();

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
    this.#points = eventModel.points;
    this.#eventListComponent = new TripListView();
  }

  init() {
    this.#renderTripCreateView();
    this.#renderPoints(this.#eventModel);
  }

  #handleTaskChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(
      this.#eventModel.offers,
      this.#eventModel.destinations,
      updatedPoint,
      this.#eventModel.eventTypes,
    );
  };

  #renderEmptyViewMessage () {
    render(new TripListEmptyView({filter: this.#eventModel.filters[0]}), this.#boardContainer);
  }

  #renderTripSortView({points}) {
    const sorters = generateSorter(points);
    render(new TripSortView({sorters}), this.#boardContainer);
  }

  #renderTripCreateView() {
    const pointCreateComponent = new TripCreateView (
      this.#eventModel.offers,
      this.#eventModel.destinations,
      this.#eventModel.defaultPoint,
      this.#eventModel.eventTypes,
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
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#handleTaskChange,
    });
    pointPresenter.init(
      this.#eventModel.offers,
      this.#eventModel.destinations,
      point,
      this.#eventModel.eventTypes,
    );
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList () {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
