import TripInfoView from '../view/trip-info-view';
import { render, remove, RenderPosition } from '../framework/render';

export default class TripInfoPresenter {

  #pointsModel = null;
  #tripInfoContainer = null;
  #tripInfoComponent = null;

  constructor({pointsModel, tripInfoContainer}) {
    this.#pointsModel = pointsModel;
    this.#tripInfoContainer = tripInfoContainer;
  }

  init() {
    if(this.#pointsModel.points.length === 0) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
      return;
    }
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
    this.#tripInfoComponent = new TripInfoView({
      pointsModel: this.#pointsModel,
    });
    render(this.#tripInfoComponent,this.#tripInfoContainer.closest('.trip-main'), RenderPosition.AFTERBEGIN);

  }
}
