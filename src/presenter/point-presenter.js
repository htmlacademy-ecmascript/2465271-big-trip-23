import TripEditView from '../view/trip-edit-view';
import TripPointView from '../view/trip-point-view';
import { render, replace, remove } from '../framework/render';
import { Mode, UserAction, UpdateType } from '../const';

export default class PointPresenter {
  #pointContainer = null;
  #pointEventComponent = null;
  #editEventComponent = null;

  #offers = null;
  #destinations = null;
  #point = null;
  #eventTypes = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({pointContainer, onDataChange, onModeChange}) {
    this.#pointContainer = pointContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onDeleteButtonClick: this.#handleDeleteClick,
    });

    if (prevPointEventComponent === null || prevEditEventComponent === null) {
      render(this.#pointEventComponent, this.#pointContainer);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointEventComponent, prevPointEventComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevPointEventComponent);
    remove(prevEditEventComponent);
  }

  destroy() {
    remove(this.#pointEventComponent);
    remove(this.#editEventComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.reset(this.#point);
      this.#replaceEditFormToPointForm();
    }
  }

  #replacePointFormToEditForm() {
    replace(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPointForm () {
    replace(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editEventComponent.reset(this.#point);
      this.#replaceEditFormToPointForm();
    }
  };

  #handleFavoriteClick = () => {
    // this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleTripEditClick = () => {
    this.#replacePointFormToEditForm();
  };

  #handleFormSubmit = (point) => {
    // this.#handleDataChange(point);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceEditFormToPointForm();
  };

  #handleCloseButtonClick = () => {
    this.#editEventComponent.reset(this.#point);
    this.#replaceEditFormToPointForm();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
