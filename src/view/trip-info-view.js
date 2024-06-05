import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { sortDefaultByDay, displayInfoDate } from '../utils/task';

const createTripInfoTemplate = (pointsModel) => {
  const {points, offers, destinations} = pointsModel;

  const sortedTripDate = sortDefaultByDay(points);

  const startTripDate = displayInfoDate(sortedTripDate.at(0).dateFrom);

  const finishTripDate = displayInfoDate(sortedTripDate.at(-1).dateTo);

  const viewTotalTripDate = () => `${startTripDate} - ${finishTripDate}`;

  const baseTotalPrise = points.reduce((acc, price) => acc + price.basePrice, 0);

  const offersData = offers.map((elem) => elem.offers).flat();

  const offersPriceId = points.map((elem) => elem.offers).flat();

  const createOffersPrice = () => {
    const priceList = [];
    for(let i = 0; i < offersPriceId.length; i++) {
      for(let j = 0; j < offersData.length; j++) {
        if(offersPriceId[i] === offersData[j].id) {
          priceList.push(offersData[j].price);
        }
      }
    } return priceList;
  };

  const totalOffersPrice = createOffersPrice().reduce((acc, elem) => acc + elem, 0);

  const totalPrice = totalOffersPrice + baseTotalPrise;

  const tripDestinationId = sortDefaultByDay(points).map((elem) => elem.destination);

  const createTripDestinationList = () => {
    const destinationList = [];
    for(let i = 0; i < tripDestinationId.length; i++) {
      for(let j = 0; j < destinations.length; j++) {
        if(tripDestinationId[i] === destinations[j].id) {
          destinationList.push(destinations[j].name);
        }
      }
    } return destinationList;
  };

  const viewTripDestination = () => {
    if(createTripDestinationList().length <= 3) {
      return createTripDestinationList().join(' - ');
    } else {
      return `${createTripDestinationList()[0]}  . . .  ${createTripDestinationList()[createTripDestinationList().length - 1]}`;
    }
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${viewTripDestination()}</h1>

      <p class="trip-info__dates">${viewTotalTripDate()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`);
};
export default class TripInfoView extends AbstractStatefulView {

  #pointsModel = null;

  constructor ({pointsModel}) {
    super();
    this.#pointsModel = pointsModel;
  }

  get template() {
    return createTripInfoTemplate(this.#pointsModel);
  }
}
