import { getFirstWordCapitalize, displayEditTime } from '../utils/task';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTripEditFormTemplate = (offers, destinations, point, eventTypes) => {
  const {basePrice, dateFrom, dateTo, type} = point;
  const typeOffers = offers.find((elem) => elem.type === point.type).offers;
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const destinationPoint = destinations.find((elem) => elem.id === point.destination) || {};
  const {name = '', description = '', pictures = []} = destinationPoint;
  const eventId = point.id || 0;

  const createOffersData = (title, price, id, state) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}-${id}" ${state}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;

  const createOffersContainer = () =>
    `<section class="event__section">
      <h3 class="event__section-title  event__section-title--offers">Offer</h3>
      <div class="event__available-offers">
      ${typeOffers.map((offer) => selectedOffers.find((elem) => elem.id === offer.id) ? createOffersData(offer.title, offer.price, offer.id, 'checked') : createOffersData(offer.title, offer.price, offer.id, '')).join('')}
      </div>
    </section>`;

  const createPhotosData = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;

  const createDescriptionContainer = () =>
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures.map((photo) => createPhotosData(photo)).join('')}
        </div>
      </div>
    </section>`;

  const createEventDestinationList = (destination) =>
    `<option value="${destination}"></option>`;

  const createEventTypeList = (lowerCaseType, upperCaseType, state) =>
    `<div class="event__type-item">
      <input id="event-type-${lowerCaseType}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseType}" ${state}>
      <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-${eventId}">${upperCaseType}</label>
    </div>`;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${eventTypes.map((elem) => elem === type ? createEventTypeList(elem, getFirstWordCapitalize(elem), 'checked') : createEventTypeList(elem, getFirstWordCapitalize(elem), '')).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${eventId}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-${eventId}">
            <datalist id="destination-list-${eventId}">
              ${destinations.map((elem) => createEventDestinationList(elem.name))}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${displayEditTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${displayEditTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
    ${typeOffers.length !== 0 || description || pictures.length !== 0 ?
      `<section class="event__details">
        ${typeOffers.length !== 0 ? createOffersContainer() : ''}
        ${description || pictures.length !== 0 ? createDescriptionContainer() : ''}
      </section>` : ''
    }
      </form>
    </li>`
  );
};

export default class TripEditView extends AbstractStatefulView {

  #offers = null;
  #destinations = null;
  #point = null;
  #eventTypes = null;
  #handleSubmit = null;
  #handleCancel = null;
  #handleDelete = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({offers, destinations, point, eventTypes, onFormSubmit, onDeleteButtonClick, onCloseButtonClick}) {
    super();
    this._setState(point);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#point = point;
    this.#eventTypes = eventTypes;
    this.#handleSubmit = onFormSubmit;
    this.#handleCancel = onCloseButtonClick;
    this.#handleDelete = onDeleteButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createTripEditFormTemplate(this.#offers, this.#destinations, this._state, this.#eventTypes);
  }

  reset(point) {
    this.updateElement(
      point
    );
  }

  removeElement() {
    super.removeElement();

    if(this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    } if(this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onFormCancel);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onFormDelete);
    this.element.querySelector('.event__section').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeEventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#changeEventDestinationHandler);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  #changeEventTypeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #changeEventDestinationHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinations.find((elem) => elem.id === this._state.destination);
    const checkedDestination = this.#destinations.find((elem) => elem.name === evt.target.value);
    if(!checkedDestination) {
      return;
    } if(checkedDestination) {
      this.updateElement({
        destination: checkedDestination.id,
      });
    } else {
      this.updateElement({
        destination: currentDestination.id,
      });
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        maxDate: this._state.dateTo,
        defaulDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
      },
    );
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        minDate: this._state.dateFrom,
        defaulDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
      },
    );
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    if(!this._state) {
      return;
    }
    this.#handleSubmit(this._state);
  };

  #onFormCancel = (evt) => {
    evt.preventDefault();
    this.#handleCancel();
  };

  #onFormDelete = (evt) => {
    evt.preventDefault();
    this.#handleDelete(this._state);
  };

  #onOffersChange = (evt) => {
    evt.preventDefault();
    const setOffers = (state) => {
      const currentOffers = this.#offers.find((elem) => elem.type === this._state.type).offers;
      const currentOffersId = currentOffers.map((elem) => elem.id);
      const currentOffer = evt.target.getAttribute('name').slice(-36);
      if(!state.includes(currentOffer)) {
        const pushState = [...currentOffersId].filter((elem) => elem === currentOffer).join(' ');
        state.push(pushState);
        return state;
      } else {
        const cutState = state.filter((elem) => elem !== currentOffer);
        return cutState;
      }
    };
    this._setState({
      offers: setOffers(this._state.offers),
    });
  };

  #onPriceInput = (evt) => {
    evt.preventDefault();
    const currentPrice = this.#point.basePrice;
    if (!isNaN(evt.target.value)) {
      this._setState({
        basePrice: he.encode(evt.target.value),
      });
    } if(!this._state.basePrice) {
      this._setState({
        basePrice: currentPrice,
      });
    }
  };
}
