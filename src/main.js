import HeaderPagePresenter from './presenter/header-presenter';
import MainPagePresenter from './presenter/main-presenter';

const pageHeaderFiltersElement = document.querySelector('.trip-controls__filters');
const pageMainTripEventElement = document.querySelector('.trip-events');
const mainPagePresenter = new MainPagePresenter({boardContainer: pageMainTripEventElement});
const headerPagePresenter = new HeaderPagePresenter({boardContainer: pageHeaderFiltersElement});

headerPagePresenter.init();
mainPagePresenter.init();
