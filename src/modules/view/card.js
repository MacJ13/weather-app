export class Card {
  container = document.getElementById("container");

  render(data, unit) {
    this.renderCard(data, unit);
  }

  clearCard() {
    this.container.innerHTML = "";
  }

  async renderCard(data, unit) {
    this.container.classList.remove("hidden");

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
    this.container.classList.remove("hidden");
    this.container.textContent = msg;
  }
}
