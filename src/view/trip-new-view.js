import AbstractView from '../framework/view/abstract-view';

export default class TripNewView extends AbstractView {
  #element = null;
  #handleCreateButtonClick = null;

  constructor({onClick}) {
    super();
    this.#handleCreateButtonClick = onClick;
    this.#element = document.querySelector('.trip-main__event-add-btn');
    this.#element?.addEventListener('click', this.#handleNewPointClick);
  }

  get element() {
    return this.#element;
  }

  #handleNewPointClick = (evt) => {
    evt.preventDefault();
    this.#handleCreateButtonClick();
  };
}
