import { createElement } from '../render';
import { getFirstWordCapitalize, displayEditTime } from '../utils';

const createTripFormTemplate = (offerData, destinationData, pointData) => {
  const {type, offers} = offerData.find((item, idx) => idx === 0);
  const {name, description, pictures} = destinationData.find((item, idx) => idx === 0);
  const {dataFrom, dataTo, basePrice} = pointData.find((item, idx) => idx === 0);

  const createPhotosData = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

  const createOffersData = (title, price) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}">
      <label class="event__offer-label" for="event-offer-${title}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;

  const createEventDestinationList = (destination) =>
    `<option value="${destination}"></option>`;

  const createEventTypeList = (lowerCaseType, upperCaseType, checked) =>
    `<div class="event__type-item">
      <input id="event-type-${lowerCaseType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseType}" ${checked}>
      <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-1">${upperCaseType}</label>
    </div>`;

  const startTime = displayEditTime(dataFrom);

  const endTime = displayEditTime(dataTo);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${[...new Set(offerData)].map((elem) => {
      if(elem.type === type) {
        return createEventTypeList(elem.type, getFirstWordCapitalize(elem.type), 'checked');
      } else {
        return createEventTypeList(elem.type, getFirstWordCapitalize(elem.type));
      }
    }).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${[...new Set(destinationData)].map((elem) => createEventDestinationList(elem.name)).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">${offers ? 'Offer' : ''}</h3>

            <div class="event__available-offers">
            ${offers.find((item) => item.title) ? offers.map((offer) => createOffersData(offer.title, offer.price)).join('') : ''}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">${description || pictures ? 'Destination' : ''}</h3>
            <p class="event__destination-description">${description ? description : ''}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures ? pictures.map((photo) => createPhotosData(photo)).join('') : ''}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`);
};
export default class TripCreateView {

  constructor({offerData}, {destinationData}, {pointData}) {
    this.offerData = offerData;
    this.destinationData = destinationData;
    this.pointData = pointData;
  }

  getTemplate() {
    return createTripFormTemplate(this.offerData, this.destinationData, this.pointData);
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
