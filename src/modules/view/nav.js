export class Nav {
  formEl = document.querySelector(".form");
  inputEl = document.getElementById("search");
  unitEl = document.querySelector(".nav-units");

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

  onClick(callback) {
    this.unitEl.addEventListener("click", (e) => {
      if (e.target.nodeName !== "BUTTON") return;

      if (e.target.classList.contains("active")) return;

      const { unit } = e.target.dataset;
      this.toggleUnitButtons();
      callback(unit);
    });
  }
}
