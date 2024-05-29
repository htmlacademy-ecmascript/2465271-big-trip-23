import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import LoadingView from '../view/trip-loading-view';
import NewPointPresenter from './new-point-presenter';
import PointPresenter from './point-presenter';
import { render, remove, RenderPosition } from '../framework/render';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay, filter } from '../utils/task';
import { SortTypes, FilterType, EVENT_TYPES, UpdateType, UserAction } from '../const';

export default class MainPagePresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #pointsListComponent = new TripListView();
  #emptyMessageComponent = null;
  #loadingComponent = new LoadingView();

  #currentSortType = SortTypes.DAY;
  #filterType = FilterType.EVERYTHING;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #isLoading = true;

  constructor({pointsContainer, pointsModel, offersModel, destinationsModel, filterModel, onNewPointDestroy}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      pointListContainer: this.#pointsListComponent,
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
      render(this.#pointsListComponent, this.#pointsContainer);
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
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
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderPoints(this.points);
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderPoints(this.points);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    render(this.#emptyMessageComponent, this.#pointsContainer);
  };

  #renderTripSortView() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSoptTypeChange
    });
    render(this.#sortComponent, this.#pointsContainer);
  }

  #renderPoints(points) {
    if (this.#isLoading) {
      render(this.#pointsListComponent, this.#pointsContainer);
      this.#renderLoading();
      return;
    }
    if (isEmpty(points)) {
      remove(this.#pointsListComponent);
      this.#renderEmptyViewMessage();
      return;
    }
    this.#renderTripSortView(this.points);
    render(this.#pointsListComponent, this.#pointsContainer);
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint (point) {
    // console.log(this.#offersModel.offers);
    // console.log(this.#destinationsModel.destinations);
    const pointPresenter = new PointPresenter({
      pointContainer: this.#pointsListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(
      this.#offersModel.offers,
      this.#destinationsModel.destinations,
      point,
      EVENT_TYPES,
    );
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearPoints({resetSortType = false} = {}) {

    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if(this.#pointsListComponent) {
      remove(this.#pointsListComponent);
    }

    if (this.#emptyMessageComponent) {
      remove(this.#emptyMessageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }
}
