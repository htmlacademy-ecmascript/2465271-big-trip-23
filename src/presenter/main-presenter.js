import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripCreateView from '../view/trip-create-view';
import TripPointView from '../view/trip-point-view';
import { getDefaultEventPoint } from '../utils';
import { render, replace } from '../framework/render';

export default class MainPagePresenter {
  #boardContainer = null;
  #eventModel = null;
  #eventSortComponent = new TripSortView();
  #eventListComponent = new TripListView();
  #offers = [];
  #destinations = [];
  #points = [];

  constructor({boardContainer, eventModel}) {
    this.#boardContainer = boardContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#offers = this.#eventModel.offers;
    this.#destinations = this.#eventModel.destinations;
    this.#points = this.#eventModel.points;

    render(this.#eventSortComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    // render(new TripEditView
    // (offers, destinations, points[3])
    // , this.#eventListComponent.element);

    render(new TripCreateView
    (this.#offers, this.#destinations, getDefaultEventPoint())
    , this.#eventListComponent.element);

    for (const point of this.#points) {
      this.#renderPoint(this.#offers, this.#destinations, point);
    }
  }

  #renderPoint (offers, destinations, point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPointForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointEventComponent = new TripPointView (offers, destinations, point, {
      onTripEditClick: () => {
        replacePointFormToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editEventComponent = new TripEditView (offers, destinations, point, {
      onButtonSubmit: () => {
        replaceEditFormToPointForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseButtonClick: () => {
        replaceEditFormToPointForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointFormToEditForm () {
      replace(editEventComponent, pointEventComponent);
    }

    function replaceEditFormToPointForm () {
      replace(pointEventComponent, editEventComponent);
    }
    // (offers, destinations, point)
    // const pointElement = new TripPointView (offers, destinations, point);
    render(pointEventComponent, this.#eventListComponent.element);
  }
}
