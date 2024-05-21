import HeaderPagePresenter from './presenter/header-presenter';
import MainPagePresenter from './presenter/main-presenter';
import EventModel from './model/event-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destination-model';
import FilterModel from './model/filter-model';

const pageHeaderFiltersElement = document.querySelector('.trip-controls__filters');
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
});
const headerPagePresenter = new HeaderPagePresenter({
  headerContainer: pageHeaderFiltersElement,
  filterModel,
  eventModel,
});

headerPagePresenter.init();
mainPagePresenter.init();
