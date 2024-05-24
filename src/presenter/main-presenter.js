import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import NewPointPresenter from './new-point-presenter';
import PointPresenter from './point-presenter';
import { render, remove } from '../framework/render';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay, filter } from '../utils/task';
import { SortTypes, FilterType, EVENT_TYPES, UpdateType, UserAction } from '../const';

export default class MainPagePresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #eventListComponent = new TripListView();
  #emptyMessageComponent = null;

  #currentSortType = SortTypes.DAY;
  #filterType = FilterType.EVERYTHING;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({boardContainer, pointsModel, offersModel, destinationsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      pointListContainer: this.#eventListComponent.element,
      emptyMessageRender: this.#renderEmptyViewMessage,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.TIME:
        return sortByTime(filteredPoints);
      case SortTypes.PRICE:
        return sortByPrice(filteredPoints);
    }
    return sortDefaultByDay(filteredPoints);
  }

  init() {
    this.#renderPoints(this.points);
  }

  createPoint() {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    if (this.#emptyMessageComponent !== null) {
      remove(this.#emptyMessageComponent);
      this.#emptyMessageComponent = null;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderPoints(this.points);
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderPoints(this.points);
        break;
    }
  };

  #handleSoptTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints(this.points);
  };

  #renderEmptyViewMessage = () => {
    this.#emptyMessageComponent = new TripListEmptyView({
      filterType: this.#filterType
    });
    render(this.#emptyMessageComponent, this.#boardContainer);
  };

  #renderTripSortView() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSoptTypeChange
    });
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPoints(points) {
    if (isEmpty(points)) {
      this.#renderEmptyViewMessage();
      return;
    }
    this.#renderTripSortView(this.#pointsModel.points);
    render(this.#eventListComponent, this.#boardContainer);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(
      this.#offersModel.offers,
      this.#destinationsModel.destinations,
      point,
      EVENT_TYPES,
    );
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints({resetSortType = false} = {}) {

    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#emptyMessageComponent) {
      remove(this.#emptyMessageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }
}
