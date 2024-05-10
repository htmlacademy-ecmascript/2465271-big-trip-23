import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import TripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { getDefaultEventPoint } from '../utils/task';
import { render, replace } from '../framework/render';
import { generateSorter } from '../mock/mock-sort';
import { isEmpty } from '../utils/task';

export default class MainPagePresenter {
  #boardContainer = null;
  #eventModel = null;
  #eventListComponent = null;

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
    this.#eventListComponent = new TripListView();
  }

  init() {
    render(new TripCreateView
    (this.#eventModel.offers, this.#eventModel.destinations, getDefaultEventPoint())
    , this.#eventListComponent.element);
    this.#renderPoints(this.#eventModel);
  }

  #renderEmptyViewMessage () {
    render(new TripListEmptyView({filter: this.#eventModel.filters[0]}), this.#boardContainer);
  }

  #renderTripSortView({sortTypes}) {
    const sorters = generateSorter(sortTypes);
    render(new TripSortView(sorters), this.#boardContainer);
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

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPointForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onTripEditClick = () => replacePointFormToEditForm();
    const onFormSubmit = () => replaceEditFormToPointForm();
    const onCloseButtonClick = () => replaceEditFormToPointForm();

    const pointEventComponent = new TripPointView ({
      offers,
      destinations,
      point,
      onTripEditClick: onTripEditClick,
    });

    const editEventComponent = new TripEditView ({
      offers,
      destinations,
      point,
      onFormSubmit: onFormSubmit,
      onCloseButtonClick: onCloseButtonClick,
    });

    function replacePointFormToEditForm () {
      replace(editEventComponent, pointEventComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceEditFormToPointForm () {
      replace(pointEventComponent, editEventComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointEventComponent, this.#eventListComponent.element);
  }
}
