import TripEditView from '../view/trip-edit-view';
import TripPointView from '../view/trip-point-view';
import { render, replace } from '../framework/render';

export default class PointPresenter {
  #pointContainer = null;
  #pointEventComponent = null;
  #editEventComponent = null;
  #offers = null;
  #destinations = null;
  #point = null;
  #eventTypes = null;

  constructor({pointContainer}) {
    this.#pointContainer = pointContainer;
  }

  init(offers, destinations, point, eventTypes) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#point = point;
    this.#eventTypes = eventTypes;
    this.#pointEventComponent = new TripPointView({
      offers: this.#offers,
      destinations: this.#destinations,
      point: this.#point,
      onTripEditClick: this.#handleTripEditClick,
    });
    this.#editEventComponent = new TripEditView ({
      offers: this.#offers,
      destinations: this.#destinations,
      point: this.#point,
      eventTypes: this.#eventTypes,
      onFormSubmit: this.#handleFormSubmit,
      onCloseButtonClick: this.#handleCloseButtonClick,
    });
    render(this.#pointEventComponent, this.#pointContainer);
  }

  #replacePointFormToEditForm() {
    replace(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToPointForm () {
    replace(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPointForm();
    }
  };

  #handleTripEditClick = () => {
    this.#replacePointFormToEditForm();
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToPointForm();
  };

  #handleCloseButtonClick = () => {
    this.#replaceEditFormToPointForm();
  };
}
