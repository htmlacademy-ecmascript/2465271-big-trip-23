import TripFilterView from '../view/trip-filter-view';
// import TripInfoView from '../view/trip-info-view';
import { render, replace, remove } from '../framework/render';
// import { generateSorterAndFilter } from '../utils/grader';
import { filter } from '../utils/filter';
import { FilterType, UpdateType } from '../const';

export default class HeaderPagePresenter {
  #headerContainer = null;
  #filterModel = null;
  #eventModel = null;

  #filterComponent = null;
  // eventInfoComponent = new TripInfoView();

  constructor({headerContainer, filterModel, eventModel}) {
    this.#headerContainer = headerContainer;
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
      render(this.#filterComponent, this.#headerContainer);
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

  // init() {
  //   this.#renderTripFilterView(this.#filterModel);
  //   // render(this.eventInfoComponent, this.boardContainer.closest('.trip-main'), RenderPosition.AFTERBEGIN);
  // }

  // #renderTripFilterView () {
  //   render(new TripFilterView({
  //     filters,
  //     currentFilterType: 'everything',
  //     onFilterTypeChange: () => {},
  //   }) , this.boardContainer);
  // }
}
