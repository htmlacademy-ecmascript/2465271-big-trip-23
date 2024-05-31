import FilterPagePresenter from './presenter/filter-presenter';
import MainPagePresenter from './presenter/main-presenter';
import TripNewView from './view/trip-new-view';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic dewopSHLoPs2024';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const pageTripFiltersElement = document.querySelector('.trip-controls__filters');
const pageMainTripEventElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();


const filterPagePresenter = new FilterPagePresenter({
  filterContainer: pageTripFiltersElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new TripNewView({
  onClick: handleNewPointButtonClick
});

const mainPagePresenter = new MainPagePresenter({
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
  mainPagePresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPagePresenter.init();
mainPagePresenter.init();
pointsModel.init().finally(() => {
  newPointButtonComponent.element.disabled = false;
});
