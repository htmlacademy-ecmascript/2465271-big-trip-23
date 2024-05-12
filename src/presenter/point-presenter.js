import TripEditView from '../view/trip-edit-view';
import TripPointView from '../view/trip-point-view';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {
  #pointContainer = null;
  #pointEventComponent = null;
  #editEventComponent = null;
  #offers = null;
  #destinations = null;
  #point = [];
  #eventTypes = null;
  #handleDataChange = null;

  constructor({pointContainer, onDataChange}) {
    this.#pointContainer = pointContainer;
    this.#handleDataChange = onDataChange;
  }

  init(offers, destinations, point, eventTypes) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#point = point;
    this.#eventTypes = eventTypes;

    const prevPointEventComponent = this.#pointEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#pointEventComponent = new TripPointView({
      offers: this.#offers,
      destinations: this.#destinations,
      point: this.#point,
      onTripEditClick: this.#handleTripEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editEventComponent = new TripEditView ({
      offers: this.#offers,
      destinations: this.#destinations,
      point: this.#point,
      eventTypes: this.#eventTypes,
      onFormSubmit: this.#handleFormSubmit,
      onCloseButtonClick: this.#handleCloseButtonClick,
    });

    if (prevPointEventComponent === null || prevEditEventComponent === null) {
      render(this.#pointEventComponent, this.#pointContainer);
      return;
    }
    if (this.#pointContainer.contains(prevPointEventComponent.element)) {
      replace(this.#pointEventComponent, prevPointEventComponent);
    }
    if (this.#pointContainer.contains(prevEditEventComponent.element)) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevPointEventComponent);
    remove(prevEditEventComponent);
  }

  destroy() {
    remove(this.#pointEventComponent);
    remove(this.#editEventComponent);
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

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleTripEditClick = () => {
    this.#replacePointFormToEditForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToPointForm();
  };

  #handleCloseButtonClick = () => {
    this.#replaceEditFormToPointForm();
  };
}
