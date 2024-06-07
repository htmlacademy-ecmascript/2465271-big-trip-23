import TripEditView from '../view/trip-edit-view';
import TripPointView from '../view/trip-point-view';
import { render, replace, remove } from '../framework/render';
import { Mode, UserAction, UpdateType } from '../const';

export default class PointPresenter {
  #pointContainer = null;
  #pointComponent = null;
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

    const prevPointComponent = this.#pointComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#pointComponent = new TripPointView({
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
      onDeleteButtonClick: this.#handleDeleteClick,
      onCloseButtonClick: this.#handleCloseButtonClick,
    });

    if (prevPointComponent === null || prevEditEventComponent === null) {
      render(this.#pointComponent, this.#pointContainer.element);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditEventComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditEventComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editEventComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.reset(this.#point);
      this.#replaceEditFormToPointForm();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editEventComponent.shake(resetFormState);
  }

  #replacePointFormToEditForm() {
    replace(this.#editEventComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleEscapeKeyPress);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPointForm () {
    replace(this.#pointComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#handleEscapeKeyPress);
    this.#mode = Mode.DEFAULT;
  }

  #handleEscapeKeyPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editEventComponent.reset(this.#point);
      this.#replaceEditFormToPointForm();
    }
  };

  #handleFavoriteClick = () => {
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
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
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
    document.removeEventListener('keydown', this.#handleEscapeKeyPress);
  };
}
