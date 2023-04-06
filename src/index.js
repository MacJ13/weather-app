"use strict";
import "./sass/main.scss";

console.log("hello");

const url_weather =
  "https://api.openweathermap.org/data/2.5/weather?q=jozefow&units=metric&appid=7e81e22c2388addd9806a42c9ea870fd";

// const url_forecast =
//   "https://api.openweathermap.org/data/2.5/forecast?q=jozefow&appid=7e81e22c2388addd9806a42c9ea870fd";

const getWeather = async function () {
  //   const resp = await fetch(url_forecast, { mode: "cors" });
  //   const resp = await fetch(url_weather, { mode: "cors" });
  //   const weatherData = await resp.json();
  //   console.log(weatherData);
};

getWeather();
