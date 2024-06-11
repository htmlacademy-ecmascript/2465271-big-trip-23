import FilterPresenter from './presenter/filter-presenter';
import MainPresenter from './presenter/main-presenter';
import TripNewView from './view/trip-new-view';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic dewopSHLoPs2024';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const pageTripFiltersElement = document.querySelector('.trip-controls__filters');

const pageMainTripEventElement = document.querySelector('.trip-events');


const filterModel = new FilterModel();

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const filterPresenter = new FilterPresenter({
  filterContainer: pageTripFiltersElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new TripNewView({
  onClick: handleNewPointButtonClick
});

const mainPresenter = new MainPresenter({
  pointsContainer: pageMainTripEventElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
  newPointButtonComponent: newPointButtonComponent,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

pointsModel.init();
mainPresenter.init();
filterPresenter.init();
