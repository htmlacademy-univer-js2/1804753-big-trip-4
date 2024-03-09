import { getRandomInteger, getRandomValue } from "../utils.js";
import { OFFERS, Price } from '../const.js'

const generateOffer = () => {
    const offer = getRandomValue(OFFERS);

    return {
        id: crypto.randomUUID(),
        title: offer,
        price: getRandomInteger(Price.MIN, (Price.MAX / 10))
    };
}

export { generateOffer };