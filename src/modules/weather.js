import { Api } from "./data/api";
import { Nav } from "./view/nav";
import { Card } from "./view/card";

const navView = new Nav();
const cardView = new Card();
const api = new Api();

const getWeather = async function () {
  try {
    if (navView.getSearchValue() === api.getLocation()) return;
    cardView.renderSpinner();
    const location = navView.getSearchValue();
    const weatherData = await api.getData(location);
    cardView.render(weatherData, api.getUnit());
  } catch (error) {
    console.error(error.message);
    api.clearLocation();
    cardView.renderError(error.message);
  }
};

const changeUnit = async function (unit) {
  api.setUnit(unit);
  try {
    if (!api.getLocation()) return;
    const { main } = await api.getData();
    cardView.changeUnits(unit, main);
  } catch (error) {
    console.error(error.message);
    cardView.renderError(error.message);
  }
};

export const init = function () {
  navView.onSubmit(getWeather);
  navView.onClick(changeUnit);
};
