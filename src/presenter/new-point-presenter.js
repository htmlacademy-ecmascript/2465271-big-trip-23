import {remove, render, RenderPosition} from '../framework/render.js';
import TripCreateView from '../view/trip-create-view.js';
import { EVENT_TYPES, UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #pointsModel = null;
  #pointListContainer = null;
  #emptyMessageRender = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventTypes = EVENT_TYPES;

  #newPointComponent = null;

  constructor({pointsModel, pointListContainer, emptyMessageRender, onDataChange, onDestroy}) {
    this.#pointsModel = pointsModel;
    this.#pointListContainer = pointListContainer;
    this.#emptyMessageRender = emptyMessageRender;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new TripCreateView({
      offers: this.#pointsModel.offers,
      destinations: this.#pointsModel.destinations,
      point: this.#pointsModel.defaultPoint,
      eventTypes: this.#eventTypes,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteButtonClick: this.#handleDeleteClick,
    });

    render(this.#newPointComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

    if(this.#pointListContainer.element.childElementCount === 0) {
      remove(this.#pointListContainer);
      this.#emptyMessageRender();
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    // this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
