import FilterView from './view/filter-view.js';
import { render } from './render.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'));

render(new FilterView(), siteHeaderElement.querySelector('.trip-controls__filters'));

tripPresenter.init();