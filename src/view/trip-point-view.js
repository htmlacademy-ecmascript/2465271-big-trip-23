import dayjs from 'dayjs';
import { createElement } from '../render';
import { displayEventTime, displayEventDate } from '../utils';

const createTripPointTemplate = (offerData, destinationData) => {
  const {type, offers} = offerData;
  const {destination, dataFrom, dataTo, isFavorite, basePrice} = destinationData;

  const startTime = displayEventTime(dataFrom);
  const endTime = displayEventTime(dataTo);
  const eventDay = displayEventDate(dataFrom);
  const dayDuration = dayjs(dataTo).diff(dataFrom, 'd');
  const hourDuration = dayjs(dataTo).diff(dataFrom, 'h') % 24;
  const minuteDuration = dayjs(dataTo).diff(dataFrom, 'm') % 60;
  const totalDuration = `${dayDuration}D ${hourDuration}H ${minuteDuration}M`;

  const createOffersData = (option, price) =>
    `<li class="event__offer">
    <span class="event__offer-title">${option}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`;

  const createFavoriteData = () => isFavorite ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${eventDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dataFrom}>${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime=${dataTo}>${endTime}</time>
        </p>
        <p class="event__duration">${totalDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers ? offers.map((offer) => createOffersData(offer.option, offer.price)).join('') : ''}
      </ul>
      <button class="event__favorite-btn ${createFavoriteData()}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

export default class TripPointView {

  constructor({offerData}, {destinationData}) {
    this.offerData = offerData;
    this.destinationData = destinationData;
  }

  getTemplate() {
    return createTripPointTemplate(this.offerData, this.destinationData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
