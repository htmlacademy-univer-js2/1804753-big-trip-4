import AbstractView from '../framework/view/abstract-view.js';
import { POINT_EMPTY, TYPES, CITIES } from "../const.js";
import { formatStringToDateTime } from '../utils.js';

const createPointCitiesOptionsTemplate = () => {
    return (
        `<datalist id="destination-list-1">
            ${CITIES.map((city) => `<option value="${city}"></option>`).join('')}
        </div>`
    );
}

const createPointPhotosTemplate = (pointDestination) => {
    return (
        `<div class="event__photos-tape">
            ${pointDestination.pictures.map((picture) => 
            `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
        </div>`
    );
}

const createPointTypesTemplate = (currentType) => {
    return TYPES.map((type) => 
        `<div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
        </div>`).join(''); 
}

const createPointOffersTemplate = ({pointOffers}) => {
    const offerItems = pointOffers.map(offer => {
        return (
            `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" checked>
                <label class="event__offer-label" for="${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                </label>
            </div>`
        );
    }).join('');

    return `<div class="event__available-offers">${offerItems}</div>`;
}

const createEditPointTemplate = ({point, pointDestination, pointOffers}) => {
    const { basePrice, dateFrom, dateTo, offers, type } = point;

    return (
        `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                    <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                        <fieldset class="event__type-group">
                            <legend class="visually-hidden">Event type</legend>
                            ${createPointTypesTemplate(type)}
                        </fieldset>
                    </div>
                    </div>
                    <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                            ${type}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
                        ${createPointCitiesOptionsTemplate()}
                    </div>
                    <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatStringToDateTime(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatStringToDateTime(dateTo)}">
                    </div>
                    <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                    </div>
                    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                    <button class="event__reset-btn" type="reset">Cancel</button>
                    <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                    </button>
                </header>
                <section class="event__details">
                    <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                        ${createPointOffersTemplate({pointOffers})}
                    </section>
                    <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${pointDestination.description}</p>
                        <div class="event__photos-container">
                            ${createPointPhotosTemplate(pointDestination)}
                        </div>
                    </section>
                </section>
            </form>
        </li>`
    );
}

export default class EditPointView extends AbstractView {
    #point = null;
    #pointDestination = null;
    #pointOffers = null;
    #onSubmitClick = null;
    #onResetClick = null;

    constructor({point = POINT_EMPTY, pointDestination, pointOffers, onSubmitClick, onResetClick}) {
        super();
        this.#point = point;
        this.#pointDestination = pointDestination;
        this.#pointOffers = pointOffers;
        this.#onSubmitClick = onSubmitClick;
        this.#onResetClick = onResetClick;

        this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

        this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetButtonClickHandler);
    }

    get template() {
        return createEditPointTemplate({
            point: this.#point, 
            pointDestination: this.#pointDestination,
            pointOffers: this.#pointOffers
        });
    }

    #formSubmitHandler = (evt) => {
        evt.preventDefault();
        this.#onSubmitClick();
    }

    #resetButtonClickHandler = (evt) => {
        evt.preventDefault();
        this.#onResetClick();
    }
}