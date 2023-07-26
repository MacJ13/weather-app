/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/data/api.js":
/*!*********************************!*\
  !*** ./src/modules/data/api.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* binding */ Api)
/* harmony export */ });
class Api {
  unit = "metric";
  location = "";
  // const url_weather =
  "";

  getUnit() {
    return this.unit;
  }

  getLocation() {
    return this.location;
  }

  clearLocation() {
    this.location = "";
  }

  setUnit(unit) {
    this.unit = unit;
  }

  // url for openweather api;
  getUrl(location = this.location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${this.unit}&appid=7e81e22c2388addd9806a42c9ea870fd`;
  }

  // fetch data with fetch API
  async getData(location) {
    const url = this.getUrl(location);

    const resp = await fetch(url);
    console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText + ". " + resp.status);
    }

    const data = await resp.json();

    this.location = data.name.toLowerCase();
    return data;
  }
}


/***/ }),

/***/ "./src/modules/view/card.js":
/*!**********************************!*\
  !*** ./src/modules/view/card.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
class Card {
  container = document.getElementById("container");

  render(data, unit) {
    this.renderCard(data, unit);
  }

  clearCard() {
    this.container.innerHTML = "";
  }

  async renderCard(data, unit) {
    const cardEl = document.createElement("div");
    cardEl.className = "card weather-card";

    const cardInfoEl = this.renderCardInfo(data, unit);

    const cardDetailsEl = await this.renderCardDetails(data.weather[0]);
    this.clearCard();
    cardEl.insertAdjacentHTML("beforeend", cardInfoEl);
    cardEl.appendChild(cardDetailsEl);

    this.container.appendChild(cardEl);
  }

  renderCardInfo(data, unit) {
    const currentUnit = unit === "metric" ? "C" : "F";

    return `   
        <h2 class="weather-location">
          <span class="city">${data.name}</span>,
          <span class="country">${data.sys.country}</span>
        </h2>

      <div class="weather-info">
        <div class="weather-current weather-cell" data-term="temp">
          <span class="weather-feature">${Math.round(
            data.main.temp
          )}°${currentUnit}</span>
        </div>
        <div class="weather-col">
          <div class="weather-cell" data-term="feels_like">
            feel: 
            <span class="weather-feature">${Math.round(
              data.main.feels_like
            )}°${currentUnit}</span>
          </div>
          <div class="weather-cell" data-term="temp_max">
            max:
            <span class="weather-feature">${Math.round(
              data.main.temp_max
            )}°${currentUnit}</span> 
          </div>
          <div class="weather-cell" data-term="temp_min">
            min:
            <span class="weather-feature">${Math.round(
              data.main.temp_min
            )}°${currentUnit}</span> 
          </div>
        </div>
        <div class="weather-col">
          <div class="weather-cell">
            pressure: 
            <span class="weather-feature">${data.main.pressure} hPa</span> 
          </div>
          <div class="weather-cell">
            humidity: 
            <span class="weather-feature">${data.main.humidity} %</span>
          </div>
          <div class="weather-cell">
            wind: 
            <span class="weather-feature">${Math.round(
              data.wind.speed
            )} mph</span>
          </div>
        </div>
      </div>

`;
  }

  renderCardDetails(weather) {
    return new Promise(function (resolve, reject) {
      const div = document.createElement("div");
      div.className = "weather-details";

      const img = new Image();
      img.className = "weather-icon";

      const span = document.createElement("span");
      span.className = "weather-desc";
      span.textContent = weather.description;

      img.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
      img.addEventListener("load", () => {
        div.appendChild(img);
        div.appendChild(span);
        resolve(div);
      });

      img.addEventListener("error", () => {
        reject(new Error("we cannot get icon sorry!"));
      });
    });
  }

  changeUnits(unit, main) {
    const currentUnit = unit === "metric" ? "°C" : "°F";
    for (const prop in main) {
      const cellEl = document.querySelector(`[data-term="${prop}"]`);
      if (!cellEl) return;
      const featureEl = cellEl.querySelector(".weather-feature");
      featureEl.textContent = `${Math.round(main[prop])}${currentUnit}`;
    }
  }

  renderSpinner() {
    this.clearCard();

    const html = `<img class="spinner" src="spinner.png" alt="spinner" /> `;

    this.container.insertAdjacentHTML("beforeend", html);
  }

  renderError(msg) {
    this.container.textContent = msg;
  }
}


/***/ }),

/***/ "./src/modules/view/nav.js":
/*!*********************************!*\
  !*** ./src/modules/view/nav.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nav": () => (/* binding */ Nav)
/* harmony export */ });
class Nav {
  formEl = document.querySelector(".form");
  inputEl = document.getElementById("search");
  unitEl = document.querySelector(".nav-units");
  unitActiveEl = document.querySelector(".nav-active-unit");

  getSearchValue() {
    const location = this.inputEl.value;
    if (location.length < 3)
      throw new Error("Error! Try to enter at least 3 letters!");
    return location;
  }

  toggleUnitButtons() {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active");
    });
  }

  onSubmit(callback) {
    this.formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      callback();
    });
  }

  changeUnitActive(unit) {
    if (unit == "metric") {
      this.unitActiveEl.style.transform = `translateX(-50%)`;
    } else this.unitActiveEl.style.transform = `translateX(50%)`;
  }

  onClick(callback) {
    this.unitEl.addEventListener("click", (e) => {
      if (e.target.nodeName !== "BUTTON") return;

      if (e.target.classList.contains("active")) return;

      const { unit } = e.target.dataset;
      this.changeUnitActive(unit);
      this.toggleUnitButtons();
      callback(unit);
    });
  }
}


/***/ }),

/***/ "./src/modules/weather.js":
/*!********************************!*\
  !*** ./src/modules/weather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _data_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/api */ "./src/modules/data/api.js");
/* harmony import */ var _view_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/nav */ "./src/modules/view/nav.js");
/* harmony import */ var _view_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/card */ "./src/modules/view/card.js");




const navView = new _view_nav__WEBPACK_IMPORTED_MODULE_1__.Nav();
const cardView = new _view_card__WEBPACK_IMPORTED_MODULE_2__.Card();
const api = new _data_api__WEBPACK_IMPORTED_MODULE_0__.Api();

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

const init = function () {
  navView.onSubmit(getWeather);
  navView.onClick(changeUnit);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _modules_weather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/weather */ "./src/modules/weather.js");



(0,_modules_weather__WEBPACK_IMPORTED_MODULE_1__.init)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04wQjtBQUNlO0FBQ3pDO0FBQ0Esc0RBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zYXNzL21haW4uc2Nzcz9hNGU2Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvZGF0YS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy92aWV3L2NhcmQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy92aWV3L25hdi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgY2xhc3MgQXBpIHtcclxuICB1bml0ID0gXCJtZXRyaWNcIjtcclxuICBsb2NhdGlvbiA9IFwiXCI7XHJcbiAgLy8gY29uc3QgdXJsX3dlYXRoZXIgPVxyXG4gIFwiXCI7XHJcblxyXG4gIGdldFVuaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy51bml0O1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9jYXRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbjtcclxuICB9XHJcblxyXG4gIGNsZWFyTG9jYXRpb24oKSB7XHJcbiAgICB0aGlzLmxvY2F0aW9uID0gXCJcIjtcclxuICB9XHJcblxyXG4gIHNldFVuaXQodW5pdCkge1xyXG4gICAgdGhpcy51bml0ID0gdW5pdDtcclxuICB9XHJcblxyXG4gIC8vIHVybCBmb3Igb3BlbndlYXRoZXIgYXBpO1xyXG4gIGdldFVybChsb2NhdGlvbiA9IHRoaXMubG9jYXRpb24pIHtcclxuICAgIHJldHVybiBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz0ke3RoaXMudW5pdH0mYXBwaWQ9N2U4MWUyMmMyMzg4YWRkZDk4MDZhNDJjOWVhODcwZmRgO1xyXG4gIH1cclxuXHJcbiAgLy8gZmV0Y2ggZGF0YSB3aXRoIGZldGNoIEFQSVxyXG4gIGFzeW5jIGdldERhdGEobG9jYXRpb24pIHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKGxvY2F0aW9uKTtcclxuXHJcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgaWYgKCFyZXNwLm9rKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwLnN0YXR1c1RleHQgKyBcIi4gXCIgKyByZXNwLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3AuanNvbigpO1xyXG5cclxuICAgIHRoaXMubG9jYXRpb24gPSBkYXRhLm5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ2FyZCB7XHJcbiAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIik7XHJcblxyXG4gIHJlbmRlcihkYXRhLCB1bml0KSB7XHJcbiAgICB0aGlzLnJlbmRlckNhcmQoZGF0YSwgdW5pdCk7XHJcbiAgfVxyXG5cclxuICBjbGVhckNhcmQoKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVuZGVyQ2FyZChkYXRhLCB1bml0KSB7XHJcbiAgICBjb25zdCBjYXJkRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY2FyZEVsLmNsYXNzTmFtZSA9IFwiY2FyZCB3ZWF0aGVyLWNhcmRcIjtcclxuXHJcbiAgICBjb25zdCBjYXJkSW5mb0VsID0gdGhpcy5yZW5kZXJDYXJkSW5mbyhkYXRhLCB1bml0KTtcclxuXHJcbiAgICBjb25zdCBjYXJkRGV0YWlsc0VsID0gYXdhaXQgdGhpcy5yZW5kZXJDYXJkRGV0YWlscyhkYXRhLndlYXRoZXJbMF0pO1xyXG4gICAgdGhpcy5jbGVhckNhcmQoKTtcclxuICAgIGNhcmRFbC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgY2FyZEluZm9FbCk7XHJcbiAgICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FyZERldGFpbHNFbCk7XHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZEVsKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNhcmRJbmZvKGRhdGEsIHVuaXQpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRVbml0ID0gdW5pdCA9PT0gXCJtZXRyaWNcIiA/IFwiQ1wiIDogXCJGXCI7XHJcblxyXG4gICAgcmV0dXJuIGAgICBcclxuICAgICAgICA8aDIgY2xhc3M9XCJ3ZWF0aGVyLWxvY2F0aW9uXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpdHlcIj4ke2RhdGEubmFtZX08L3NwYW4+LFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb3VudHJ5XCI+JHtkYXRhLnN5cy5jb3VudHJ5fTwvc3Bhbj5cclxuICAgICAgICA8L2gyPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cIndlYXRoZXItaW5mb1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyLWN1cnJlbnQgd2VhdGhlci1jZWxsXCIgZGF0YS10ZXJtPVwidGVtcFwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyLWZlYXR1cmVcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgIGRhdGEubWFpbi50ZW1wXHJcbiAgICAgICAgICApfcKwJHtjdXJyZW50VW5pdH08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIndlYXRoZXItY29sXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VhdGhlci1jZWxsXCIgZGF0YS10ZXJtPVwiZmVlbHNfbGlrZVwiPlxyXG4gICAgICAgICAgICBmZWVsOiBcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyLWZlYXR1cmVcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgZGF0YS5tYWluLmZlZWxzX2xpa2VcclxuICAgICAgICAgICAgKX3CsCR7Y3VycmVudFVuaXR9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VhdGhlci1jZWxsXCIgZGF0YS10ZXJtPVwidGVtcF9tYXhcIj5cclxuICAgICAgICAgICAgbWF4OlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndlYXRoZXItZmVhdHVyZVwiPiR7TWF0aC5yb3VuZChcclxuICAgICAgICAgICAgICBkYXRhLm1haW4udGVtcF9tYXhcclxuICAgICAgICAgICAgKX3CsCR7Y3VycmVudFVuaXR9PC9zcGFuPiBcclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndlYXRoZXItY2VsbFwiIGRhdGEtdGVybT1cInRlbXBfbWluXCI+XHJcbiAgICAgICAgICAgIG1pbjpcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyLWZlYXR1cmVcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgZGF0YS5tYWluLnRlbXBfbWluXHJcbiAgICAgICAgICAgICl9wrAke2N1cnJlbnRVbml0fTwvc3Bhbj4gXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VhdGhlci1jb2xcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyLWNlbGxcIj5cclxuICAgICAgICAgICAgcHJlc3N1cmU6IFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndlYXRoZXItZmVhdHVyZVwiPiR7ZGF0YS5tYWluLnByZXNzdXJlfSBoUGE8L3NwYW4+IFxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VhdGhlci1jZWxsXCI+XHJcbiAgICAgICAgICAgIGh1bWlkaXR5OiBcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyLWZlYXR1cmVcIj4ke2RhdGEubWFpbi5odW1pZGl0eX0gJTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndlYXRoZXItY2VsbFwiPlxyXG4gICAgICAgICAgICB3aW5kOiBcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ3ZWF0aGVyLWZlYXR1cmVcIj4ke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgZGF0YS53aW5kLnNwZWVkXHJcbiAgICAgICAgICAgICl9IG1waDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbmA7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDYXJkRGV0YWlscyh3ZWF0aGVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJ3ZWF0aGVyLWRldGFpbHNcIjtcclxuXHJcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBpbWcuY2xhc3NOYW1lID0gXCJ3ZWF0aGVyLWljb25cIjtcclxuXHJcbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgc3Bhbi5jbGFzc05hbWUgPSBcIndlYXRoZXItZGVzY1wiO1xyXG4gICAgICBzcGFuLnRleHRDb250ZW50ID0gd2VhdGhlci5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7d2VhdGhlci5pY29ufUAyeC5wbmdgO1xyXG4gICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgICAgICByZXNvbHZlKGRpdik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIndlIGNhbm5vdCBnZXQgaWNvbiBzb3JyeSFcIikpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVW5pdHModW5pdCwgbWFpbikge1xyXG4gICAgY29uc3QgY3VycmVudFVuaXQgPSB1bml0ID09PSBcIm1ldHJpY1wiID8gXCLCsENcIiA6IFwiwrBGXCI7XHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gbWFpbikge1xyXG4gICAgICBjb25zdCBjZWxsRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10ZXJtPVwiJHtwcm9wfVwiXWApO1xyXG4gICAgICBpZiAoIWNlbGxFbCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBmZWF0dXJlRWwgPSBjZWxsRWwucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWZlYXR1cmVcIik7XHJcbiAgICAgIGZlYXR1cmVFbC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQobWFpbltwcm9wXSl9JHtjdXJyZW50VW5pdH1gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyU3Bpbm5lcigpIHtcclxuICAgIHRoaXMuY2xlYXJDYXJkKCk7XHJcblxyXG4gICAgY29uc3QgaHRtbCA9IGA8aW1nIGNsYXNzPVwic3Bpbm5lclwiIHNyYz1cInNwaW5uZXIucG5nXCIgYWx0PVwic3Bpbm5lclwiIC8+IGA7XHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyRXJyb3IobXNnKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lci50ZXh0Q29udGVudCA9IG1zZztcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE5hdiB7XHJcbiAgZm9ybUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpO1xyXG4gIGlucHV0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcclxuICB1bml0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdi11bml0c1wiKTtcclxuICB1bml0QWN0aXZlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdi1hY3RpdmUtdW5pdFwiKTtcclxuXHJcbiAgZ2V0U2VhcmNoVmFsdWUoKSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcclxuICAgIGlmIChsb2NhdGlvbi5sZW5ndGggPCAzKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciEgVHJ5IHRvIGVudGVyIGF0IGxlYXN0IDMgbGV0dGVycyFcIik7XHJcbiAgICByZXR1cm4gbG9jYXRpb247XHJcbiAgfVxyXG5cclxuICB0b2dnbGVVbml0QnV0dG9ucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2LWJ0blwiKS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uU3VibWl0KGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVW5pdEFjdGl2ZSh1bml0KSB7XHJcbiAgICBpZiAodW5pdCA9PSBcIm1ldHJpY1wiKSB7XHJcbiAgICAgIHRoaXMudW5pdEFjdGl2ZUVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC01MCUpYDtcclxuICAgIH0gZWxzZSB0aGlzLnVuaXRBY3RpdmVFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCg1MCUpYDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soY2FsbGJhY2spIHtcclxuICAgIHRoaXMudW5pdEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgIT09IFwiQlVUVE9OXCIpIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHsgdW5pdCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgdGhpcy5jaGFuZ2VVbml0QWN0aXZlKHVuaXQpO1xyXG4gICAgICB0aGlzLnRvZ2dsZVVuaXRCdXR0b25zKCk7XHJcbiAgICAgIGNhbGxiYWNrKHVuaXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFwaSB9IGZyb20gXCIuL2RhdGEvYXBpXCI7XHJcbmltcG9ydCB7IE5hdiB9IGZyb20gXCIuL3ZpZXcvbmF2XCI7XHJcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi92aWV3L2NhcmRcIjtcclxuXHJcbmNvbnN0IG5hdlZpZXcgPSBuZXcgTmF2KCk7XHJcbmNvbnN0IGNhcmRWaWV3ID0gbmV3IENhcmQoKTtcclxuY29uc3QgYXBpID0gbmV3IEFwaSgpO1xyXG5cclxuY29uc3QgZ2V0V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgaWYgKG5hdlZpZXcuZ2V0U2VhcmNoVmFsdWUoKSA9PT0gYXBpLmdldExvY2F0aW9uKCkpIHJldHVybjtcclxuICAgIGNhcmRWaWV3LnJlbmRlclNwaW5uZXIoKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gbmF2Vmlldy5nZXRTZWFyY2hWYWx1ZSgpO1xyXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBhcGkuZ2V0RGF0YShsb2NhdGlvbik7XHJcbiAgICBjYXJkVmlldy5yZW5kZXIod2VhdGhlckRhdGEsIGFwaS5nZXRVbml0KCkpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgYXBpLmNsZWFyTG9jYXRpb24oKTtcclxuICAgIGNhcmRWaWV3LnJlbmRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNoYW5nZVVuaXQgPSBhc3luYyBmdW5jdGlvbiAodW5pdCkge1xyXG4gIGFwaS5zZXRVbml0KHVuaXQpO1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoIWFwaS5nZXRMb2NhdGlvbigpKSByZXR1cm47XHJcbiAgICBjb25zdCB7IG1haW4gfSA9IGF3YWl0IGFwaS5nZXREYXRhKCk7XHJcbiAgICBjYXJkVmlldy5jaGFuZ2VVbml0cyh1bml0LCBtYWluKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgIGNhcmRWaWV3LnJlbmRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIG5hdlZpZXcub25TdWJtaXQoZ2V0V2VhdGhlcik7XHJcbiAgbmF2Vmlldy5vbkNsaWNrKGNoYW5nZVVuaXQpO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc2Fzcy9tYWluLnNjc3NcIjtcclxuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL21vZHVsZXMvd2VhdGhlclwiO1xyXG5cclxuaW5pdCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=