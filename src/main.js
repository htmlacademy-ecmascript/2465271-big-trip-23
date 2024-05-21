import FilterPagePresenter from './presenter/filter-presenter';
import MainPagePresenter from './presenter/main-presenter';
import TripNewView from './view/trip-new-view';
import EventModel from './model/event-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destination-model';
import FilterModel from './model/filter-model';

const pageTripFiltersElement = document.querySelector('.trip-controls__filters');
const pageMainTripEventElement = document.querySelector('.trip-events');
const eventModel = new EventModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
eventModel.init();
offersModel.init();
destinationsModel.init();

const mainPagePresenter = new MainPagePresenter({
  boardContainer: pageMainTripEventElement,
  eventModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPagePresenter = new FilterPagePresenter({
  filterContainer: pageTripFiltersElement,
  filterModel,
  eventModel,
});

const newPointButtonComponent = new TripNewView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  mainPagePresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPagePresenter.init();
mainPagePresenter.init();
