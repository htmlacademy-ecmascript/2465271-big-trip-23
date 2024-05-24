import {remove, render, RenderPosition} from '../framework/render.js';
import TripCreateView from '../view/trip-create-view.js';
import { EVENT_TYPES, defaultEventPoint, UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #offers = null;
  #destinations = null;
  #pointListContainer = null;
  #emptyMessageRender = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #defaultPoint = defaultEventPoint;
  #eventTypes = EVENT_TYPES;

  #newPointComponent = null;

  constructor({offers, destinations, pointListContainer, emptyMessageRender, onDataChange, onDestroy}) {
    this.#offers = offers;
    this.#destinations = destinations;
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
      offers: this.#offers,
      destinations: this.#destinations,
      point: this.#defaultPoint,
      eventTypes: this.#eventTypes,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteButtonClick: this.#handleDeleteClick,
    });

    render(this.#newPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
    if(this.#pointListContainer.childElementCount === 0) {
      this.#emptyMessageRender();
    }
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
    if(this.#pointListContainer.childElementCount === 0) {
      this.#emptyMessageRender();
    }
  };
}
