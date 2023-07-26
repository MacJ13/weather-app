export class Api {
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
