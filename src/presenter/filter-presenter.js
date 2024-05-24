import TripFilterView from '../view/trip-filter-view';
// import TripInfoView from '../view/trip-info-view';
import { render, replace, remove } from '../framework/render';
import { filter } from '../utils/task';
import { FilterType, UpdateType } from '../const';

export default class FilterPagePresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventModel = null;

  #filterComponent = null;
  // eventInfoComponent = new TripInfoView();

  constructor({filterContainer, filterModel, eventModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#eventModel.points;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
