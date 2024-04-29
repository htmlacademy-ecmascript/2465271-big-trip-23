import HeaderPagePresenter from './presenter/header-presenter';
import MainPagePresenter from './presenter/main-presenter';
import EventModel from './model/event-model';

const pageHeaderFiltersElement = document.querySelector('.trip-controls__filters');
const pageMainTripEventElement = document.querySelector('.trip-events');
const eventModel = new EventModel();
const mainPagePresenter = new MainPagePresenter({
  boardContainer: pageMainTripEventElement,
  eventModel,
});
const headerPagePresenter = new HeaderPagePresenter({boardContainer: pageHeaderFiltersElement});

headerPagePresenter.init();
mainPagePresenter.init();
