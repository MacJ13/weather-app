export class Nav {
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
