import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import TripCreateView from '../view/trip-create-view';
import PointPresenter from './point-presenter';
import { render } from '../framework/render';
import { generateSorterAndFilter } from '../utils/grader';
import { isEmpty, sortByPrice, sortByTime } from '../utils/task';
import { sorter } from '../utils/sort';
import { updatePoint } from '../utils/common';

export default class MainPagePresenter {
  #boardContainer = null;
  #eventModel = null;
  #eventListComponent = null;
  #points = [];
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = '';
  #sourcedEventPoints = [];

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
    this.#points = eventModel.points;
    this.#currentSortType = eventModel.sortTypes.DAY;
    this.#eventListComponent = new TripListView();
  }

  init() {
    this.#renderTripSortView(this.#points);
    this.#renderTripCreateView();
    this.#sourcedEventPoints = [...this.#points];
    this.#renderPoints(this.#points);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventPointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#sourcedEventPoints = updatePoint(this.#sourcedEventPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(
      this.#eventModel.offers,
      this.#eventModel.destinations,
      updatedPoint,
      this.#eventModel.eventTypes,
    );
  };

  #sortPoints (sortPoint) {
    switch (sortPoint) {
      case this.#eventModel.sortTypes.TIME:
        this.#points = sortByTime(this.#points);
        break;
      case this.#eventModel.sortTypes.PRICE:
        this.#points = sortByPrice(this.#points);
        break;
      default:
        this.#points = [...this.#sourcedEventPoints];
    }
    this.#currentSortType = sortPoint;
  }

  #handleSoptTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints(this.#points);
  };

  #renderEmptyViewMessage () {
    render(new TripListEmptyView({filter: this.#eventModel.filters[0]}), this.#boardContainer);
  }

  #renderTripSortView(points) {
    const sorters = generateSorterAndFilter(sorter, points);
    this.#sortComponent = new TripSortView({
      sorters,
      onSortTypeChange: this.#handleSoptTypeChange
    });
    render(this.#sortComponent, this.#boardContainer);
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

  #renderPoints(points) {
    if (isEmpty(points)) {
      this.#renderEmptyViewMessage();
      return;
    }
    render(this.#eventListComponent, this.#boardContainer);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#handleEventPointChange,
      onModeChange: this.#handleModeChange,
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
