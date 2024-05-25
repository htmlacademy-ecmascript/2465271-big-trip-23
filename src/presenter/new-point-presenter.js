import {remove, render, RenderPosition} from '../framework/render.js';
import TripEditView from '../view/trip-edit-view.js';
import { EVENT_TYPES, UserAction, UpdateType} from '../const.js';
import { randomeId } from '../utils/task.js';

export default class NewPointPresenter {
  #offers = null;
  #destinations = null;
  #pointsConatainer = null;
  #pointListContainer = null;
  #emptyMessageRender = null;
  #handleDataChange = null;
  #handleDestroy = null;
  // #defaultPoint = randomeId();
  #eventTypes = EVENT_TYPES;

  #newPointComponent = null;

  constructor({offers, destinations, pointsContainer, pointListContainer, emptyMessageRender, onDataChange, onDestroy}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointsConatainer = pointsContainer;
    this.#pointListContainer = pointListContainer;
    this.#emptyMessageRender = emptyMessageRender;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new TripEditView({
      offers: this.#offers,
      destinations: this.#destinations,
      point: randomeId(),
      eventTypes: this.#eventTypes,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteButtonClick: this.#handleDeleteClick,
    });

    render(this.#newPointComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    render(this.#pointListContainer, this.#pointsConatainer);

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
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
