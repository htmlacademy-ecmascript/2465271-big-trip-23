import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import LoadingView from '../view/trip-loading-view';
import FailedLoadingView from '../view/trip-failed-loading-view';
import NewPointPresenter from './new-point-presenter';
import PointPresenter from './point-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import { render, remove, RenderPosition } from '../framework/render';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay, filter } from '../utils/task';
import { SortTypes, FilterType, EVENT_TYPES, UpdateType, UserAction } from '../const';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class MainPagePresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #pointsListComponent = new TripListView();
  #emptyMessageComponent = null;
  #newPointButtonComponent = null;
  #loadingComponent = new LoadingView();
  #failedLoadingComponent = new FailedLoadingView();

  #currentSortType = SortTypes.DAY;
  #filterType = FilterType.EVERYTHING;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #isLoading = true;

  constructor({pointsContainer, pointsModel, filterModel, onNewPointDestroy, newPointButtonComponent}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonComponent = newPointButtonComponent;

    this.#newPointPresenter = new NewPointPresenter({
      pointsModel: this.#pointsModel,
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

  failedMessage() {
    render(this.#failedLoadingComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
        this.#newPointButtonComponent.element.disabled = false;
        break;
      case UpdateType.ERROR:
        remove(this.#loadingComponent);
        this.#newPointButtonComponent.element.disabled = true;
        render(this.#pointsListComponent, this.#pointsContainer);
        this.#renderErrorMessage();
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
      this.#newPointButtonComponent.element.disabled = true;
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
    const pointPresenter = new PointPresenter({
      pointContainer: this.#pointsListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(
      this.#pointsModel.offers,
      this.#pointsModel.destinations,
      point,
      EVENT_TYPES,
    );
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderErrorMessage() {
    render(this.#failedLoadingComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
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
