import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { sortDefaultByDay, displayInfoDate } from '../utils/task';

const createTripInfoTemplate = (pointsModel) => {
  const {points, offers, destinations} = pointsModel;
  const startTripDate = displayInfoDate(sortDefaultByDay(points).at(0).dateFrom);
  const finishTripDate = displayInfoDate(sortDefaultByDay(points).at(-1).dateTo);
  const tripDestinationId = sortDefaultByDay(points).map((destination) => destination.destination);
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

  console.log(viewTripDestination());

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${viewTripDestination()}</h1>

      <p class="trip-info__dates">${startTripDate}&nbsp;&mdash;&nbsp;${finishTripDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
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
