import AbstractView from '../framework/view/abstract-view';

export default class TripNewView extends AbstractView {
  #element = null;
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.#element = document.querySelector('.trip-main__event-add-btn');
    this.#element.addEventListener('click', this.#clickHandler);
  }

  get element() {
    return this.#element;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
